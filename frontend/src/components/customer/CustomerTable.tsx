import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/redux/hooks";
import type { Customer } from "@/types/customer";

interface CustomerTableProps {
  searchQuery: string;
  statusFilter: string;
  visibleColumns: string[];
}

type ColumnKey =
  | "name"
  | "phone"
  | "area"
  | "capacity"
  | "price"
  | "status"
  | "address"
  | "city"
  | "pincode";

type SortDirection = "asc" | "desc";

const rowsPerPage = 10;

const columnWidths: Record<ColumnKey, string> = {
  name: "w-[210px]",
  phone: "w-[150px]",
  area: "w-[150px]",
  capacity: "w-[120px]",
  price: "w-[120px]",
  status: "w-[130px]",
  address: "w-[220px]",
  city: "w-[150px]",
  pincode: "w-[130px]",
};

const columns: Array<{
  key: ColumnKey;
  label: string;
  align?: "right";
  value: (customer: Customer) => string | number;
  render?: (customer: Customer) => React.ReactNode;
}> = [
  { key: "name", label: "Name", value: (customer) => customer.name },
  { key: "phone", label: "Phone", value: (customer) => customer.phone },
  { key: "area", label: "Area", value: (customer) => customer.area || "-" },
  {
    key: "capacity",
    label: "Capacity",
    align: "right",
    value: (customer) => customer.capacity ?? 0,
    render: (customer) => customer.capacity ?? "-",
  },
  {
    key: "price",
    label: "Price",
    align: "right",
    value: (customer) => customer.price ?? 0,
    render: (customer) => `₹ ${customer.price ?? 0}`,
  },
  {
    key: "status",
    label: "Status",
    value: (customer) => customer.status,
    render: (customer) => (
      <span
        className={
          customer.status === "ACTIVE"
            ? "inline-flex rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700"
            : "inline-flex rounded-full border border-red-300 bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700"
        }
      >
        {customer.status === "ACTIVE" ? "Active" : "Inactive"}
      </span>
    ),
  },
  { key: "address", label: "Address", value: (customer) => customer.address },
  { key: "city", label: "City", value: (customer) => customer.city || "-" },
  {
    key: "pincode",
    label: "Pincode",
    value: (customer) => customer.pincode || "-",
  },
];

const CustomerTable = ({
  searchQuery,
  statusFilter,
  visibleColumns,
}: CustomerTableProps) => {
  const { customers, loading } = useAppSelector((state) => state.customer);
  const [sortKey, setSortKey] = useState<ColumnKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const visibleTableColumns = columns.filter((column) =>
    visibleColumns.includes(column.key)
  );

  const sortedCustomers = useMemo(() => {
    const filteredCustomers = customers.filter((customer) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        customer.name.toLowerCase().includes(searchLower) ||
        customer.phone.toLowerCase().includes(searchLower) ||
        (customer.area?.toLowerCase().includes(searchLower) ?? false) ||
        (customer.city?.toLowerCase().includes(searchLower) ?? false) ||
        customer.status.toLowerCase().includes(searchLower);

      const matchesStatus =
        statusFilter === "All" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    const sortColumn = columns.find((column) => column.key === sortKey);

    return [...filteredCustomers].sort((firstCustomer, secondCustomer) => {
      const firstValue = sortColumn?.value(firstCustomer) ?? "";
      const secondValue = sortColumn?.value(secondCustomer) ?? "";

      if (typeof firstValue === "number" && typeof secondValue === "number") {
        return sortDirection === "asc"
          ? firstValue - secondValue
          : secondValue - firstValue;
      }

      const result = String(firstValue).localeCompare(
        String(secondValue),
        undefined,
        {
          numeric: true,
          sensitivity: "base",
        }
      );

      return sortDirection === "asc" ? result : -result;
    });
  }, [customers, searchQuery, sortDirection, sortKey, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(sortedCustomers.length / rowsPerPage));

  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;

    return sortedCustomers.slice(startIndex, startIndex + rowsPerPage);
  }, [currentPage, sortedCustomers]);

  const pageCustomerIds = paginatedCustomers.map((customer) => customer._id);
  const selectedOnPageCount = pageCustomerIds.filter((id) =>
    selectedIds.includes(id)
  ).length;
  const isPageSelected =
    pageCustomerIds.length > 0 && selectedOnPageCount === pageCustomerIds.length;
  const isPagePartiallySelected =
    selectedOnPageCount > 0 && selectedOnPageCount < pageCustomerIds.length;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortDirection, sortKey, statusFilter]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  useEffect(() => {
    const filteredIds = new Set(sortedCustomers.map((customer) => customer._id));

    setSelectedIds((current) => current.filter((id) => filteredIds.has(id)));
  }, [sortedCustomers]);

  const handleSort = (columnKey: ColumnKey) => {
    if (sortKey === columnKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(columnKey);
    setSortDirection("asc");
  };

  const handleTogglePageSelection = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedIds((current) =>
        Array.from(new Set([...current, ...pageCustomerIds]))
      );
      return;
    }

    setSelectedIds((current) =>
      current.filter((id) => !pageCustomerIds.includes(id))
    );
  };

  const handleToggleCustomerSelection = (
    customerId: string,
    checked: boolean | "indeterminate"
  ) => {
    if (checked === true) {
      setSelectedIds((current) =>
        current.includes(customerId) ? current : [...current, customerId]
      );
      return;
    }

    setSelectedIds((current) => current.filter((id) => id !== customerId));
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        Loading...
      </div>
    );
  }

  if (sortedCustomers.length === 0) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        No customers found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
      <Table className="w-auto min-w-[820px]">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12 px-4">
              <Checkbox
                aria-label="Select visible customers"
                checked={
                  isPagePartiallySelected ? "indeterminate" : isPageSelected
                }
                onCheckedChange={handleTogglePageSelection}
              />
            </TableHead>
            {visibleTableColumns.map((column) => (
              <TableHead
                key={column.key}
                className={`${columnWidths[column.key]} ${
                  column.align === "right" ? "text-right" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleSort(column.key)}
                  className={
                    column.align === "right"
                      ? "ml-auto inline-flex items-center gap-1.5 font-medium text-slate-800"
                      : "inline-flex items-center gap-1.5 font-medium text-slate-800"
                  }
                >
                  {column.label}
                  <ArrowUpDown
                    className={
                      sortKey === column.key
                        ? "h-4 w-4 text-slate-950"
                        : "h-4 w-4 text-slate-500"
                    }
                  />
                </button>
              </TableHead>
            ))}
            <TableHead className="w-16 px-4 text-right"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedCustomers.map((customer) => (
            <TableRow
              key={customer._id}
              className="h-[53px] hover:bg-sky-50 data-[state=selected]:bg-sky-50"
              data-state={
                selectedIds.includes(customer._id) ? "selected" : undefined
              }
            >
              <TableCell className="w-12 px-4">
                <Checkbox
                  aria-label={`Select ${customer.name}`}
                  checked={selectedIds.includes(customer._id)}
                  onCheckedChange={(checked) =>
                    handleToggleCustomerSelection(customer._id, checked)
                  }
                />
              </TableCell>
              {visibleTableColumns.map((column) => (
                <TableCell
                  key={column.key}
                  className={
                    column.align === "right"
                      ? `${columnWidths[column.key]} text-right text-slate-900`
                      : `${columnWidths[column.key]} text-slate-900`
                  }
                >
                  {column.render
                    ? column.render(customer)
                    : column.value(customer)}
                </TableCell>
              ))}
              <TableCell className="w-16 px-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-md"
                      aria-label={`Open actions for ${customer.name}`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="min-w-32 rounded-md"
                  >
                    <DropdownMenuItem>
                      <Pencil className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {selectedIds.length} of {sortedCustomers.length} selected
        </div>

        <div className="flex items-center gap-2">
          <span className="mr-2 text-slate-500">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-md"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-md"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
