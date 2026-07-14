import type { ExportColumn } from "../types/reportExport";

/**
 * Booking Report
 */
export const bookingReportExcelColumns: ExportColumn[] = [
  { header: "Booking No", key: "bookingNumber", width: 20 },
  { header: "Date", key: "bookingDate", width: 18 },
  { header: "Customer", key: "customerName", width: 30 },
  { header: "Driver", key: "driverName", width: 20 },
  { header: "Vehicle", key: "vehicleNumber", width: 20 },
  { header: "Capacity", key: "capacity", width: 15 },
  { header: "Amount", key: "price", width: 15 },
  { header: "Status", key: "status", width: 15 },
  { header: "Payment", key: "paymentStatus", width: 18 },
];

export const bookingReportPdfColumns: ExportColumn[] = [
  { header: "Booking No", key: "bookingNumber" },
  { header: "Date", key: "bookingDate" },
  { header: "Customer", key: "customerName" },
  { header: "Driver", key: "driverName" },
  { header: "Vehicle", key: "vehicleNumber" },
  { header: "Capacity", key: "capacity" },
  { header: "Amount", key: "price" },
  { header: "Status", key: "status" },
  { header: "Payment", key: "paymentStatus" },
];

/**
 * Payment Report
 */
export const paymentReportExcelColumns: ExportColumn[] = [
  { header: "Receipt No", key: "paymentNumber", width: 20 },
  { header: "Customer", key: "customerName", width: 30 },
  { header: "Amount", key: "totalAmount", width: 15 },
  { header: "Payment Mode", key: "paymentMode", width: 18 },
  { header: "Collected By", key: "collectedBy", width: 18 },
  { header: "Driver", key: "driverName", width: 25 },
  { header: "Date", key: "paymentDate", width: 18 },
];

export const paymentReportPdfColumns: ExportColumn[] = [
  { header: "Receipt No", key: "paymentNumber" },
  { header: "Customer", key: "customerName" },
  { header: "Amount", key: "totalAmount" },
  { header: "Payment Mode", key: "paymentMode" },
  { header: "Collected By", key: "collectedBy" },
  { header: "Driver", key: "driverName" },
  { header: "Date", key: "paymentDate" },
];

/**
 * Customer Ledger
 */
export const customerLedgerExcelColumns: ExportColumn[] = [
  { header: "Date", key: "date", width: 18 },
  { header: "Type", key: "type", width: 15 },
  { header: "Reference", key: "reference", width: 20 },
  { header: "Debit", key: "debit", width: 15 },
  { header: "Credit", key: "credit", width: 15 },
  { header: "Balance", key: "balance", width: 15 },
];

export const customerLedgerPdfColumns: ExportColumn[] = [
  { header: "Date", key: "date" },
  { header: "Type", key: "type" },
  { header: "Reference", key: "reference" },
  { header: "Debit", key: "debit" },
  { header: "Credit", key: "credit" },
  { header: "Balance", key: "balance" },
];

/**
 * Driver Settlement
 */
export const driverSettlementExcelColumns: ExportColumn[] = [
  { header: "Driver", key: "driverName", width: 25 },
  { header: "Bookings", key: "bookings", width: 15 },
  { header: "Collected", key: "totalCollected", width: 18 },
  { header: "Pending", key: "pendingCollection", width: 18 },
];

export const driverSettlementPdfColumns: ExportColumn[] = [
  { header: "Driver", key: "driverName" },
  { header: "Bookings", key: "bookings" },
  { header: "Collected", key: "totalCollected" },
  { header: "Pending", key: "pendingCollection" },
];

/**
 * Daily Collection
 */
export const dailyCollectionExcelColumns: ExportColumn[] = [
  { header: "Date", key: "_id", width: 18 },
  { header: "Payments", key: "totalPayments", width: 15 },
  { header: "Cash", key: "cash", width: 15 },
  { header: "UPI", key: "upi", width: 15 },
  { header: "Bank", key: "bank", width: 15 },
  { header: "Total", key: "total", width: 18 },
];

export const dailyCollectionPdfColumns: ExportColumn[] = [
  { header: "Date", key: "_id" },
  { header: "Payments", key: "totalPayments" },
  { header: "Cash", key: "cash" },
  { header: "UPI", key: "upi" },
  { header: "Bank", key: "bank" },
  { header: "Total", key: "total" },
];

export const getSelectedColumns = (
  allColumns: ExportColumn[],
  selectedColumns?: string[],
): ExportColumn[] => {
  if (!selectedColumns || selectedColumns.length === 0) {
    return allColumns;
  }

  return allColumns.filter((column) => selectedColumns.includes(column.key));
};
