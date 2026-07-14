import { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import SearchableSelect from "@/components/common/SearchableSelect";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { searchCustomersThunk } from "@/redux/customer";

import type { Customer } from "@/types/customer";

interface PaymentCustomerProps {
  customer: Customer | null;

  onCustomerSelect: (customer: Customer) => void;
}

const PaymentCustomer = ({
  customer,
  onCustomerSelect,
}: PaymentCustomerProps) => {
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

  return (
    <div className="space-y-4 rounded-lg border p-5">
      <h3 className="text-lg font-semibold">Customer Information</h3>

      <SearchableSelect<Customer>
        label="Customer"
        placeholder="Search Customer"
        selectedOption={customer}
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

          <Input readOnly value={customer?.phone ?? ""} />
        </div>

        <div>
          <Label>Address</Label>

          <Input readOnly value={customer?.address ?? ""} />
        </div>
      </div>
    </div>
  );
};

export default PaymentCustomer;
