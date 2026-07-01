import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { CirclePlus, Columns2, Plus } from "lucide-react";

interface Column {
  key: string;
  label: string;
}

interface CustomerToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  visibleColumns: string[];
  onToggleColumn: (columnKey: string) => void;
  columns: Column[];
}

const CustomerToolbar = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  visibleColumns,
  onToggleColumn,
  columns,
}: CustomerToolbarProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-normal text-slate-950">
          Customers
        </h1>

        <Button className="h-9 rounded-md bg-slate-950 px-4 text-white hover:bg-slate-800 sm:self-start">
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search customers..."
            className="h-9 w-full rounded-md border-slate-200 bg-white px-3 shadow-sm sm:w-44"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-9 rounded-md border-slate-200 bg-white px-3 shadow-sm"
              >
                <CirclePlus className="h-4 w-4" />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["All", "ACTIVE", "INACTIVE"].map((status) => (
                <DropdownMenuItem
                  key={status}
                  onSelect={() => onStatusFilterChange(status)}
                >
                  {status === "All" ? "All statuses" : status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden text-sm text-slate-500 sm:block">
            {statusFilter !== "All" ? statusFilter : ""}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-9 rounded-md border-slate-200 bg-white px-3 shadow-sm lg:ml-auto"
            >
              <Columns2 className="h-4 w-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Show / hide columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.key}
                checked={visibleColumns.includes(column.key)}
                onCheckedChange={() => onToggleColumn(column.key)}
              >
                {column.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CustomerToolbar;
