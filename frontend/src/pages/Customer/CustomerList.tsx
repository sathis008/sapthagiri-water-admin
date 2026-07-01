import { useEffect, useState } from "react";

import { useAppDispatch } from "@/redux/hooks";
import { getCustomersThunk } from "@/redux/customer";

import CustomerToolbar from "@/components/customer/CustomerToolbar";
import CustomerTable from "@/components/customer/CustomerTable";

const allColumns = [
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "area", label: "Area" },
  { key: "capacity", label: "Capacity" },
  { key: "price", label: "Price" },
  { key: "status", label: "Status" },
  { key: "address", label: "Address" },
  { key: "city", label: "City" },
  { key: "pincode", label: "Pincode" },
];

const CustomerList = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [visibleColumns, setVisibleColumns] = useState([
    "name",
    "phone",
    "address",
    "status",
  ]);

  useEffect(() => {
    dispatch(getCustomersThunk());
  }, [dispatch]);

  const handleToggleColumn = (columnKey: string) => {
    setVisibleColumns((current) =>
      current.includes(columnKey)
        ? current.filter((key) => key !== columnKey)
        : [...current, columnKey]
    );
  };

  return (
    <div className="space-y-6">
      <CustomerToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        visibleColumns={visibleColumns}
        onToggleColumn={handleToggleColumn}
        columns={allColumns}
      />
      <CustomerTable
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        visibleColumns={visibleColumns}
      />
    </div>
  );
};

export default CustomerList;
