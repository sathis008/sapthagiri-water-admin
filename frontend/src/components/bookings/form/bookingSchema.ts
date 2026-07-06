import { z } from "zod";

export const bookingSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),

  capacity: z.number().min(1),

  price: z.number().min(1, "Price must be greater than 0"),

  bookingDate: z.string().min(1, "Booking Date is required"),

  notes: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
