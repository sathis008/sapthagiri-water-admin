import { useState, useEffect } from "react";

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

  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);

  const [paymentMode, setPaymentMode] = useState<PaymentMode>("CASH");

  const [collectedBy, setCollectedBy] = useState<CollectedBy>("OFFICE");

  const [notes, setNotes] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCustomer(null);
    setDriver(null);
    setSelectedBookings([]);
    setNotes("");
    setCollectedBy("OFFICE");
    setPaymentMode("CASH");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!customer) {
      alert("Please select customer.");
      return;
    }

    if (selectedBookings.length === 0) {
      alert("Please select at least one booking.");
      return;
    }

    if (collectedBy === "DRIVER" && !driver) {
      alert("Please select driver.");
      return;
    }

    try {
      await dispatch(
        createPaymentThunk({
          customerId: customer._id,
          bookingIds: selectedBookings,
          paymentMode,
          collectedBy,
          driverId: driver?._id,
          notes,
        }),
      ).unwrap();

      // Reset Form
      setCustomer(null);
      setDriver(null);
      setSelectedBookings([]);
      setPaymentMode("CASH");
      setCollectedBy("OFFICE");
      setNotes("");

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentCustomer
        customer={customer}
        onCustomerSelect={(customer) => {
          setCustomer(customer);

          setSelectedBookings([]);

          dispatch(getPendingBookingsThunk(customer._id));
        }}
      />

      <PaymentBookingSelection
        bookings={pendingBookings}
        selectedBookings={selectedBookings}
        onSelectionChange={setSelectedBookings}
      />

      <PaymentInformation
        collectedBy={collectedBy}
        paymentMode={paymentMode}
        driver={driver}
        notes={notes}
        onCollectedByChange={setCollectedBy}
        onPaymentModeChange={setPaymentMode}
        onDriverChange={setDriver}
        onNotesChange={setNotes}
      />

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>

        <Button type="submit">Receive Payment</Button>
      </div>
    </form>
  );
};

export default PaymentForm;
