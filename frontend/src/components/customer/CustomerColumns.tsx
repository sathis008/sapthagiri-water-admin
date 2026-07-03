import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/common/DataTable";

import type { Customer } from "@/types/customer";
import CustomerRowActions from "./CustomerRowAction";


export const customerColumns = (
  onEdit: (customer: Customer) => void,
  onDelete: (customer: Customer) => void
): ColumnDef<Customer>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Customer"
      />
    ),
  },

  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Phone"
      />
    ),
  },

  {
    accessorKey: "area",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Area"
      />
    ),

    cell: ({ row }) => row.original.area || "-",
  },

  {
    accessorKey: "capacity",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Capacity"
      />
    ),

    cell: ({ row }) => row.original.capacity || "-",
  },

  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Price"
      />
    ),

    cell: ({ row }) => (
      <>₹ {row.original.price ?? 0}</>
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
      />
    ),

    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === "ACTIVE"
            ? "default"
            : "secondary"
        }
      >
        {row.original.status}
      </Badge>
    ),
  },
{
  id: "actions",

  enableSorting: false,

  enableHiding: false,

  header: "Actions",

  cell: ({ row }) => (
    <CustomerRowActions
      customer={row.original}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ),
}
];