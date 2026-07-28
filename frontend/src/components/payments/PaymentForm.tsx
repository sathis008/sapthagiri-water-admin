import { useState, useEffect, useMemo } from "react";

import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import type { Customer } from "@/types/customer";
import type { Driver } from "@/types/driver";
import type { CollectedBy, PaymentMode } from "@/types/payment";

import { createPaymentThunk, getPendingBookingsThunk } from "@/redux/payment";

import PaymentCustomer from "./form/PaymentCustomer";
import PaymentBookingSelection from "./form/PaymentBookingSelection";
import PaymentInformation from "./form/PaymentInformation";

interface PaymentFormProps {
  onSuccess: () => void;
}

const PaymentForm = ({ onSuccess }: PaymentFormProps) => {
  const dispatch = useAppDispatch();

  const { pendingBookings } = useAppSelector((state) => state.payment);

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [driver, setDriver] = useState<Driver | null>(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);

  const [paymentMode, setPaymentMode] = useState<PaymentMode>("CASH");

  const [collectedBy, setCollectedBy] = useState<CollectedBy>("OFFICE");

  const [notes, setNotes] = useState("");

  //------------------------------------------
  // Selected Bookings
  //------------------------------------------

  const selectedBookingObjects = useMemo(() => {
    return pendingBookings.filter((booking) =>
      selectedBookings.includes(booking._id),
    );
  }, [pendingBookings, selectedBookings]);

  //------------------------------------------
  // Collection Method
  //------------------------------------------

  const collectionMethod = useMemo(() => {
    if (!selectedBookingObjects.length) return null;

    return selectedBookingObjects[0].collectionMethod;
  }, [selectedBookingObjects]);

  //------------------------------------------
  // Initial Reset
  //------------------------------------------

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCustomer(null);
    setDriver(null);
    setFromDate("");
    setToDate("");
    setSelectedBookings([]);
    setCollectedBy("OFFICE");
    setPaymentMode("CASH");
    setNotes("");
  }, []);

  useEffect(() => {
    if (!customer && !driver) return;

    setSelectedBookings([]);
    dispatch(
      getPendingBookingsThunk({
        customerId: customer?._id,
        driverId: driver?._id,
        fromDate: fromDate || undefined,
        toDate: toDate || undefined,
      }),
    );
  }, [customer, driver, fromDate, toDate, dispatch]);

  // A selected driver collects payments for Driver-collection bookings.
  // Select those rows automatically once the filtered list has loaded.
  useEffect(() => {
    if (!driver) return;

    const driverCollectionBookings = pendingBookings.filter(
      (booking) => booking.collectionMethod === "DRIVER",
    );
    setSelectedBookings(
      driverCollectionBookings
        .map((booking) => booking._id),
    );
  }, [driver, pendingBookings]);

  useEffect(() => {
    if (!collectionMethod || !selectedBookingObjects.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCollectedBy("OFFICE");
      setPaymentMode("CASH");
      //   setDriver(null);
      return;
    }

    const booking = selectedBookingObjects[0];

    switch (booking.collectionMethod) {
      case "DRIVER":
        setCollectedBy("DRIVER");
        setPaymentMode("CASH");

        // /**
        //  * If booking.driver is populated
        //  */
        // setDriver((booking as unknown).driver ?? null);

        break;

      case "MANAGER":
        setCollectedBy("MANAGER");
        setPaymentMode("BANK");
        //   setDriver(null);
        break;

      case "OFFICE":
        setCollectedBy("OFFICE");

        /**
         * Office can receive
         * Cash / UPI / Bank
         */

        setPaymentMode("CASH");
        //  setDriver(null);
        break;

      default:
        setCollectedBy("OFFICE");
        setPaymentMode("CASH");
      //    setDriver(null);
    }
  }, [collectionMethod, selectedBookingObjects]);

  //------------------------------------------
  // Submit
  //------------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!customer && !driver) {
      alert("Please select a customer or driver.");
      return;
    }

    if (!selectedBookings.length) {
      alert("Please select at least one booking.");
      return;
    }

    try {
      await dispatch(
        createPaymentThunk({
          customerId: customer?._id,

          bookingIds: selectedBookings,

          collectedBy,

          paymentMode,

          driverId:
            collectedBy === "DRIVER"
              ? (driver?._id ?? selectedBookingObjects[0]?.driverId)
              : undefined,

          notes,
        }),
      ).unwrap();

      // -----------------------------
      // Reset Form
      // -----------------------------

      setCustomer(null);
      setDriver(null);
      setFromDate("");
      setToDate("");
      setSelectedBookings([]);
      setCollectedBy("OFFICE");
      setPaymentMode("CASH");
      setNotes("");

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer */}

      <PaymentCustomer
        customer={customer}
        driver={driver}
        onCustomerSelect={(customer) => {
          setCustomer((current) =>
            current?._id === customer._id ? null : customer,
          );
          setSelectedBookings([]);
        }}
        onDriverSelect={(driver) => {
          setDriver((current) =>
            current?._id === driver._id ? null : driver,
          );
          setSelectedBookings([]);
        }}
      />

      {/* Pending Bookings */}

      <PaymentBookingSelection
        bookings={customer || driver ? pendingBookings : []}
        selectedBookings={selectedBookings}
        onSelectionChange={setSelectedBookings}
        fromDate={fromDate}
        toDate={toDate}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
      />

      {/* Payment Information */}

      {collectionMethod && (
        <>
          {collectionMethod === "OFFICE" ? (
            <PaymentInformation
              paymentMode={paymentMode}
              notes={notes}
              onPaymentModeChange={setPaymentMode}
              onNotesChange={setNotes}
            />
          ) : (
            <div className="rounded-lg border bg-slate-50 p-5">
              <h3 className="mb-4 text-lg font-semibold">
                Payment Information
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <p className="text-xs text-muted-foreground">Collected By</p>

                  <p className="mt-1 font-semibold">
                    {collectedBy === "OFFICE" ? "Office" : "Driver"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Payment Mode</p>

                  <p className="mt-1 font-semibold">{paymentMode}</p>
                </div>

                {/* {collectionMethod === "DRIVER_COLLECTION" && (
                  <div>
                    <p className="text-xs text-muted-foreground">Driver</p>

                    <p className="mt-1 font-semibold">
                      {selectedBookingObjects[0]?.driverName}
                    </p>
                  </div>
                )} */}
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium">Notes</label>

                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-md border p-3"
                  placeholder="Enter payment notes..."
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* Footer */}

      <div className="flex justify-end gap-3 border-t pt-4">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={(!customer && !driver) || selectedBookings.length === 0}
        >
          Receive Payment
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
