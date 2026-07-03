import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import type { Booking } from "@/types/booking";

import { bookingSchema, type BookingFormValues } from "./bookingSchema";

interface BookingFormProps {
  booking?: Booking | null;

  onSuccess: () => void;
}

const BookingForm = ({ booking }: BookingFormProps) => {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),

    defaultValues: {
      customerId: "",

      capacity: 0,

      price: 0,

      bookingDate: "",

      notes: "",
    },
  });

  useEffect(() => {
    if (!booking) return;

    form.reset({
      customerId: booking.customerId,

      capacity: booking.capacity,

      price: booking.price,

      bookingDate: booking.bookingDate.substring(0, 10),

      notes: booking.notes,
    });
  }, [booking, form]);

  const onSubmit = (values: BookingFormValues) => {
    console.log(values);
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>Booking Form</form>;
};

export default BookingForm;
