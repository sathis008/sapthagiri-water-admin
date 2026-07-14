import { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import SearchableSelect from "@/components/common/SearchableSelect";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { searchCustomersThunk } from "@/redux/customer";

import type { Customer } from "@/types/customer";

interface BookingCustomerProps {
  customer: Customer | null;

  onCustomerSelect: (customer: Customer) => void;
}

const BookingCustomer = ({
  customer,
  onCustomerSelect,
}: BookingCustomerProps) => {
  const dispatch = useAppDispatch();

  const { customers, loading } = useAppSelector((state) => state.customer);

  useEffect(() => {
    dispatch(
      searchCustomersThunk({
        page: 1,
        limit: 10,
      }),
    );
  }, [dispatch]);
  console.log("BookingCustomer customer:", customer);
  return (
    <div className="space-y-4 rounded-lg border p-5">
      <h3 className="text-lg font-semibold">Customer Information</h3>
      <SearchableSelect<Customer>
        label="Customer"
        selectedOption={customer}
        placeholder="Search Customer"
        value={customer?._id}
        options={customers}
        loading={loading}
        getOptionLabel={(item) => item.name}
        getOptionValue={(item) => item._id}
        onSearch={(value) => {
          dispatch(
            searchCustomersThunk({
              page: 1,
              limit: 10,
              search: value,
            }),
          );
        }}
        onSelect={onCustomerSelect}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label>Phone</Label>

          <Input value={customer?.phone ?? ""} readOnly />
        </div>

        <div>
          <Label>Address</Label>

          <Input value={customer?.address ?? ""} readOnly />
        </div>
      </div>
    </div>
  );
};

export default BookingCustomer;
