import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import type { Booking } from "@/types/booking";

interface PaymentBookingSelectionProps {
  bookings: Booking[];

  selectedBookings: string[];

  onSelectionChange: (ids: string[]) => void;
  fromDate: string;
  toDate: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
}

const PaymentBookingSelection = ({
  bookings,
  selectedBookings,
  onSelectionChange,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}: PaymentBookingSelectionProps) => {
  const [showDateFilters, setShowDateFilters] = useState(false);
  //------------------------------------------
  // Selected Booking Objects
  //------------------------------------------

  const selectedBookingObjects = bookings.filter((booking) =>
    selectedBookings.includes(booking._id),
  );

  //------------------------------------------
  // Collection Method
  //------------------------------------------

  const selectedCollectionMethod =
    selectedBookingObjects.length > 0
      ? selectedBookingObjects[0].collectionMethod
      : null;

  //------------------------------------------
  // Select Booking
  //------------------------------------------

  const toggleBooking = (id: string) => {
    const booking = bookings.find((b) => b._id === id);

    if (!booking) return;

    // Remove
    if (selectedBookings.includes(id)) {
      onSelectionChange(selectedBookings.filter((item) => item !== id));
      return;
    }

    // Prevent Mixed Collection Types
    if (
      selectedCollectionMethod &&
      booking.collectionMethod !== selectedCollectionMethod
    ) {
      alert("Please select bookings with the same collection method.");
      return;
    }

    onSelectionChange([...selectedBookings, id]);
  };

  //------------------------------------------
  // Select All
  //------------------------------------------

  const allSelected =
    bookings.length > 0 && selectedBookings.length === bookings.length;

  const toggleAll = (checked: boolean) => {
    if (!checked) {
      onSelectionChange([]);
      return;
    }

    if (!bookings.length) return;

    const method = bookings[0].collectionMethod;
    onSelectionChange(
      bookings
        .filter((booking) => booking.collectionMethod === method)
        .map((booking) => booking._id),
    );
  };

  //------------------------------------------
  // Summary
  //------------------------------------------

  const totalAmount = selectedBookingObjects.reduce(
    (sum, booking) => sum + booking.price,
    0,
  );

  const totalCapacity = selectedBookingObjects.reduce(
    (sum, booking) => sum + booking.capacity,
    0,
  );

  //------------------------------------------
  // Badge Color
  //------------------------------------------

  const getBadgeVariant = (method?: Booking["collectionMethod"]) => {
    switch (method) {
      case "DRIVER_COLLECTION":
      case "DRIVER":
        return "default";

      case "ACCOUNT_COLLECTION":
      case "MANAGER":
        return "secondary";

      case "OFFICE_COLLECTION":
      case "OFFICE":
        return "outline";

      default:
        return "outline";
    }
  };

  const getCollectionLabel = (method?: string) => {
    if (!method) return "Not set";

    return method.replaceAll("_", " ");
  };

  return (
    <div className="space-y-5 rounded-lg border p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Pending Bookings</h3>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowDateFilters((visible) => !visible)}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <CalendarDays className="h-4 w-4" />
            Date filter
          </button>
          <div className="text-sm text-muted-foreground">
            {bookings.length} Bookings
          </div>
        </div>
      </div>

      {showDateFilters && <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-sm font-medium">
          From Date
          <input
            type="date"
            value={fromDate}
            onChange={(event) => onFromDateChange(event.target.value)}
            className="block h-10 w-full rounded-md border px-3 text-sm"
          />
        </label>
        <label className="space-y-1 text-sm font-medium">
          To Date
          <input
            type="date"
            value={toDate}
            min={fromDate || undefined}
            onChange={(event) => onToDateChange(event.target.value)}
            className="block h-10 w-full rounded-md border px-3 text-sm"
          />
        </label>
      </div>}

      {selectedCollectionMethod && (
        <div className="rounded-lg border bg-blue-50 px-4 py-3">
          <span className="font-medium">Selected Collection :</span>{" "}
          {selectedCollectionMethod.replaceAll("_", " ")}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="rounded-lg border border-dashed py-10 text-center text-muted-foreground">
          No pending bookings found.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[950px]">
              <thead className="bg-muted">
                <tr>
                  <th className="w-12 p-3 text-center">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={(checked) => toggleAll(Boolean(checked))}
                    />
                  </th>

                  <th className="p-3 text-left">Booking No</th>

                  <th className="p-3 text-left">Booking Date</th>

                  <th className="p-3 text-left">Capacity</th>

                  <th className="p-3 text-left">Collection</th>

                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => {
                  const checked = selectedBookings.includes(booking._id);

                  return (
                    <tr
                      key={booking._id}
                      className={`border-t transition ${
                        checked ? "bg-blue-50" : "hover:bg-muted/30"
                      }`}
                    >
                      <td className="p-3 text-center">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => toggleBooking(booking._id)}
                        />
                      </td>

                      <td className="p-3 font-medium">
                        {booking.bookingNumber}
                      </td>

                      <td className="p-3">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </td>

                      <td className="p-3">{booking.capacity} L</td>

                      <td className="p-3">
                        <Badge
                          variant={getBadgeVariant(booking.collectionMethod)}
                        >
                          {getCollectionLabel(booking.collectionMethod)}
                        </Badge>
                      </td>

                      <td className="p-3 text-right font-semibold text-green-600">
                        ₹{booking.price.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg bg-slate-100 p-5">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  Selected Bookings
                </p>

                <p className="text-3xl font-bold">{selectedBookings.length}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Total Capacity</p>

                <p className="text-3xl font-bold text-blue-600">
                  {totalCapacity} L
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Amount</p>

                <p className="text-3xl font-bold text-green-600">
                  ₹{totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentBookingSelection;
