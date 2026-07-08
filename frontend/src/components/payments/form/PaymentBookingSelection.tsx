import { Checkbox } from "@/components/ui/checkbox";

import type { Booking } from "@/types/booking";

interface PaymentBookingSelectionProps {
  bookings: Booking[];

  selectedBookings: string[];

  onSelectionChange: (ids: string[]) => void;
}

const PaymentBookingSelection = ({
  bookings,
  selectedBookings,
  onSelectionChange,
}: PaymentBookingSelectionProps) => {
  const allSelected =
    bookings.length > 0 && selectedBookings.length === bookings.length;

  const toggleBooking = (id: string) => {
    if (selectedBookings.includes(id)) {
      onSelectionChange(selectedBookings.filter((item) => item !== id));
    } else {
      onSelectionChange([...selectedBookings, id]);
    }
  };

  const toggleAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(bookings.map((b) => b._id));
    } else {
      onSelectionChange([]);
    }
  };

  const totalAmount = bookings
    .filter((b) => selectedBookings.includes(b._id))
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="rounded-lg border p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Pending Bookings</h3>

        <div className="text-sm text-muted-foreground">
          {bookings.length} Bookings
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-lg border border-dashed py-10 text-center text-muted-foreground">
          No pending bookings found.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[900px]">
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
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-t hover:bg-muted/40">
                    <td className="p-3 text-center">
                      <Checkbox
                        checked={selectedBookings.includes(booking._id)}
                        onCheckedChange={() => toggleBooking(booking._id)}
                      />
                    </td>

                    <td className="p-3 font-medium">{booking.bookingNumber}</td>

                    <td className="p-3">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>

                    <td className="p-3">{booking.capacity} L</td>

                    <td className="p-3">
                      {booking.collectionMethod?.replaceAll("_", " ")}
                    </td>

                    <td className="p-3 text-right font-semibold text-green-600">
                      ₹{booking.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sticky bottom-0 flex items-center justify-between rounded-lg bg-slate-100 p-5">
            <div>
              <p className="text-sm text-muted-foreground">Selected Bookings</p>

              <p className="text-2xl font-bold">{selectedBookings.length}</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Amount</p>

              <p className="text-3xl font-bold text-green-600">
                ₹{totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentBookingSelection;
