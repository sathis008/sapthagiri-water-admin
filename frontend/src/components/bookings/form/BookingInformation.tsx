import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { BookingFormValues } from "./bookingSchema";

interface BookingInformationProps {
  form: UseFormReturn<BookingFormValues>;
}

const BookingInformation = ({ form }: BookingInformationProps) => {
  return (
    <div className="space-y-4 rounded-lg border p-5">
      <h3 className="text-lg font-semibold">Booking Information</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Capacity */}

        <div>
          <Label htmlFor="capacity">Capacity (Litres)</Label>

          <Input
            id="capacity"
            type="number"
            placeholder="20"
            {...form.register("capacity", {
              valueAsNumber: true,
            })}
          />

          {form.formState.errors.capacity && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.capacity.message}
            </p>
          )}
        </div>

        {/* Price */}

        <div>
          <Label htmlFor="price">Price (₹)</Label>

          <Input
            id="price"
            type="number"
            placeholder="80"
            {...form.register("price", {
              valueAsNumber: true,
            })}
          />

          {form.formState.errors.price && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.price.message}
            </p>
          )}
        </div>

        {/* Booking Date */}

        <div>
          <Label htmlFor="bookingDate">Booking Date</Label>

          <Input
            id="bookingDate"
            type="date"
            {...form.register("bookingDate")}
          />

          {form.formState.errors.bookingDate && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.bookingDate.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingInformation;
