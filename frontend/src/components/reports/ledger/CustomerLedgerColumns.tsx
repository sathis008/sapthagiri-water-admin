import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";

export interface CustomerLedgerRow {
  date: string;

  type: "BOOKING" | "PAYMENT";

  reference: string;

  debit: number;

  credit: number;

  balance: number;
}

export const customerLedgerColumns: ColumnDef<CustomerLedgerRow>[] = [
  {
    accessorKey: "date",
    header: "Date",

    cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
  },

  {
    accessorKey: "type",
    header: "Type",

    cell: ({ row }) => (
      <Badge
        variant={row.original.type === "BOOKING" ? "secondary" : "default"}
      >
        {row.original.type}
      </Badge>
    ),
  },

  {
    accessorKey: "reference",
    header: "Reference",
  },

  {
    accessorKey: "debit",
    header: "Debit",

    cell: ({ row }) => (
      <span className="text-red-600 font-medium">
        ₹{row.original.debit.toLocaleString()}
      </span>
    ),
  },

  {
    accessorKey: "credit",
    header: "Credit",

    cell: ({ row }) => (
      <span className="text-green-600 font-medium">
        ₹{row.original.credit.toLocaleString()}
      </span>
    ),
  },

  {
    accessorKey: "balance",
    header: "Balance",

    cell: ({ row }) => (
      <span className="font-bold">
        ₹{row.original.balance.toLocaleString()}
      </span>
    ),
  },
];
