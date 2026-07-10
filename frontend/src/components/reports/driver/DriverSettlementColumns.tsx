import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";

export interface DriverSettlementRow {
  _id: string;

  driverName: string;

  bookings: number;

  totalCollected: number;

  pendingCollection: number;
}

export const driverSettlementColumns: ColumnDef<DriverSettlementRow>[] = [
  {
    accessorKey: "driverName",
    header: "Driver",
  },

  {
    accessorKey: "bookings",
    header: "Bookings",
  },

  {
    accessorKey: "totalCollected",
    header: "Total Collected",

    cell: ({ row }) => (
      <span className="font-medium text-green-600">
        ₹{row.original.totalCollected.toLocaleString()}
      </span>
    ),
  },

  {
    accessorKey: "pendingCollection",
    header: "Pending",

    cell: ({ row }) => (
      <Badge
        variant={row.original.pendingCollection > 0 ? "destructive" : "default"}
      >
        ₹{row.original.pendingCollection.toLocaleString()}
      </Badge>
    ),
  },
];
