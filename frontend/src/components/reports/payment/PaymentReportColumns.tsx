import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";

export interface PaymentReportRow {
  _id: string;
  paymentNumber: string;
  paymentDate: string;
  customerName: string;
  bookingNumber?: string;
  driverName?: string;
  status?: string;
  collectedBy: string;
  paymentMode: string;
  totalAmount: number;
}

export const paymentReportColumns: ColumnDef<PaymentReportRow>[] = [
  {
    accessorKey: "bookingNumber",
    header: "Booking No",
  },
  {
    accessorKey: "driverName",
    header: "Driver",
    cell: ({ row }) => row.original.driverName || "-",
  },
  {
    accessorKey: "paymentNumber",
    header: "Receipt No",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge>{row.original.status || "PAID"}</Badge>,
  },
  {
    accessorKey: "paymentDate",
    header: "Date",
    cell: ({ row }) => new Date(row.original.paymentDate).toLocaleDateString(),
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "paymentMode",
    header: "Mode",
    cell: ({ row }) => <Badge>{row.original.paymentMode}</Badge>,
  },
  {
    accessorKey: "collectedBy",
    header: "Collected By",
  },
  {
    accessorKey: "totalAmount",
    header: "Amount",
    cell: ({ row }) => `₹${row.original.totalAmount.toLocaleString()}`,
  },
];
