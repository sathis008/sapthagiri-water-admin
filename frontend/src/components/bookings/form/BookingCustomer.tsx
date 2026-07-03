import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import CustomerCombobox from "./CustomerCombobox";

import type { BookingFormValues } from "./bookingSchema";
import type { Customer } from "@/types/customer";

interface BookingCustomerProps {
  form: UseFormReturn<BookingFormValues>;

  customer?: Customer | null;

  onCustomerChange: (customer: Customer) => void;
}

const BookingCustomer = ({
  form,
  customer,
  onCustomerChange,
}: BookingCustomerProps) => {
  return (
    <div className="space-y-4 rounded-lg border p-5">
      <h3 className="text-lg font-semibold">Customer Information</h3>

      <div>
        <Label>Customer</Label>

        <CustomerCombobox
          value={form.watch("customerId")}

          onChange={onCustomerChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Phone</Label>

          <Input
            value={customer?.phone || ""}

            disabled
          />
        </div>

        <div>
          <Label>Address</Label>

          <Input
            value={customer?.address || ""}

            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default BookingCustomer;
