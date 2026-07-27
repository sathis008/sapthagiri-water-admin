import { useEffect } from "react";

import SearchableSelect from "@/components/common/SearchableSelect";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { searchCustomersThunk } from "@/redux/customer";
import { searchDriversThunk } from "@/redux/driver";

import type { Customer } from "@/types/customer";
import type { Driver } from "@/types/driver";

interface PaymentCustomerProps {
  customer: Customer | null;
  driver: Driver | null;

  onCustomerSelect: (customer: Customer) => void;
  onDriverSelect: (driver: Driver) => void;
}

const PaymentCustomer = ({
  customer,
  driver,
  onCustomerSelect,
  onDriverSelect,
}: PaymentCustomerProps) => {
  const dispatch = useAppDispatch();

  const { customers, loading: customerLoading } = useAppSelector((state) => state.customer);
  const { drivers, loading: driverLoading } = useAppSelector((state) => state.driver);

  useEffect(() => {
    dispatch(
      searchCustomersThunk({
        page: 1,
        limit: 10,
      }),
    );
    dispatch(searchDriversThunk({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <div className="space-y-4 rounded-lg border p-5">
      <h3 className="text-lg font-semibold">Payment Filters</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SearchableSelect<Customer>
          label="Customer"
          placeholder="Search Customer"
          selectedOption={customer}
          value={customer?._id}
          options={customers}
          loading={customerLoading}
          getOptionLabel={(item) => item.name}
          getOptionValue={(item) => item._id}
          onSearch={(search) => dispatch(searchCustomersThunk({ page: 1, limit: 10, search }))}
          onSelect={onCustomerSelect}
        />
        <SearchableSelect<Driver>
          label="Driver"
          placeholder="Search Driver"
          selectedOption={driver}
          value={driver?._id}
          options={drivers}
          loading={driverLoading}
          getOptionLabel={(item) => item.name}
          getOptionValue={(item) => item._id}
          onSearch={(search) => dispatch(searchDriversThunk({ page: 1, limit: 10, search }))}
          onSelect={onDriverSelect}
        />
      </div>
    </div>
  );
};

export default PaymentCustomer;
