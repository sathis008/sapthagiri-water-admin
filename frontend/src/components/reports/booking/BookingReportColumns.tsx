import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

import type { BookingReportRow } from "@/types/report";

const helper = createColumnHelper<BookingReportRow>();

const columns = [
  helper.accessor("bookingNumber", {
    id: "bookingNumber",
    header: "Booking No",
  }),

  helper.accessor("bookingDate", {
    id: "bookingDate",
    header: "Booking Date",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),

  helper.accessor("customerName", {
    id: "customerName",
    header: "Customer",
  }),

  helper.accessor("driverName", {
    id: "driverName",
    header: "Driver",
  }),

  helper.accessor("vehicleNumber", {
    id: "vehicleNumber",
    header: "Vehicle",
  }),

  helper.accessor("capacity", {
    id: "capacity",
    header: "Capacity",
  }),

  helper.accessor("price", {
    id: "price",
    header: "Amount",
    cell: (info) => `₹${info.getValue()}`,
  }),

  helper.accessor("status", {
    id: "status",
    header: "Status",
  }),

  helper.accessor("paymentStatus", {
    id: "paymentStatus",
    header: "Payment Status",
  }),
];

export const bookingReportColumns = (
  visibleColumns: string[],
): ColumnDef<BookingReportRow, unknown>[] => {
  return columns.filter(
    (column) => column.id !== undefined && visibleColumns.includes(column.id),
  ) as ColumnDef<BookingReportRow, unknown>[];
};
