import type { Booking } from "@/types/booking";

import BookingCustomer from "./BookingCustomer";
import BookingInformation from "./BookingInformation";
import { useState } from "react";
import type { Customer } from "@/types/customer";
import BookingNotes from "./BookingNotes";
import { useAppDispatch } from "@/redux/hooks";
import { createBookingThunk, getBookingsThunk } from "@/redux/booking";
import AssignBookingDialog from "../AssignBookingDialog";

interface BookingFormProps {
  booking?: Booking | null;

  onSuccess: () => void;
}

const BookingForm = ({ onSuccess }: BookingFormProps) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [capacity, setCapacity] = useState("");

  const [price, setPrice] = useState(0);

  const [bookingDate, setBookingDate] = useState(
    new Date().toISOString().substring(0, 10),
  );

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCustomer) {
      alert("Please select customer");

      return;
    }

    const payload = {
      customerId: selectedCustomer._id,

      customerName: selectedCustomer.name,

      phone: selectedCustomer.phone,

      address: selectedCustomer.address,

      capacity,

      price,

      bookingDate,

      notes: "",
    };

    try {
      await dispatch(createBookingThunk(payload)).unwrap();

      await dispatch(
        getBookingsThunk({
          page: 1,
          limit: 10,
        }),
      );

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  // const onSubmit = (values: BookingFormValues) => {
  //   console.log(values);
  // };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BookingCustomer
        customer={selectedCustomer}
        onCustomerSelect={(customer) => {
          setSelectedCustomer(customer);
          setCapacity(customer.capacity ?? "");

          setPrice(customer.price ?? 0);
        }}
      />

      <BookingInformation
        capacity={capacity}

        price={price}

        bookingDate={bookingDate}

        onCapacityChange={setCapacity}

        onPriceChange={setPrice}

        onBookingDateChange={setBookingDate}
      />

      <BookingNotes onCancel={onSuccess} />

      <AssignBookingDialog
        open={openAssignDialog}
        booking={selectedBooking}
        onOpenChange={setOpenAssignDialog}
        onSuccess={fetchBookings}
      />
    </form>
  );
};

export default BookingForm;
