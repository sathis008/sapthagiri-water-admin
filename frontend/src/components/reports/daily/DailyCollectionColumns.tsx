import type { ColumnDef } from "@tanstack/react-table";

export interface DailyCollectionRow {
  _id: string;

  totalPayments: number;

  cash: number;

  upi: number;

  bank: number;

  total: number;
}

export const dailyCollectionColumns: ColumnDef<DailyCollectionRow>[] = [
  {
    accessorKey: "_id",
    header: "Date",

    cell: ({ row }) => new Date(row.original._id).toLocaleDateString("en-IN"),
  },

  {
    accessorKey: "totalPayments",
    header: "Payments",
  },

  {
    accessorKey: "cash",
    header: "Cash",

    cell: ({ row }) => (
      <span className="font-medium text-green-600">
        ₹{row.original.cash.toLocaleString()}
      </span>
    ),
  },

  {
    accessorKey: "upi",
    header: "UPI",

    cell: ({ row }) => (
      <span className="font-medium text-blue-600">
        ₹{row.original.upi.toLocaleString()}
      </span>
    ),
  },

  {
    accessorKey: "bank",
    header: "Bank",

    cell: ({ row }) => (
      <span className="font-medium text-purple-600">
        ₹{row.original.bank.toLocaleString()}
      </span>
    ),
  },

  {
    accessorKey: "total",
    header: "Total",

    cell: ({ row }) => (
      <span className="font-bold text-primary">
        ₹{row.original.total.toLocaleString()}
      </span>
    ),
  },
];
