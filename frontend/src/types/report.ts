import type { Pagination } from "./booking";

/* ---------------- Booking Report ---------------- */

export interface BookingReportRow {
  _id: string;
  bookingNumber: string;
  bookingDate: string;
  customerName: string;
  driverName?: string;
  vehicleNumber?: string;
  capacity: number;
  price: number;
  status: string;
  paymentStatus: string;
}

export interface BookingReportSummary {
  totalBookings: number;
  totalCapacity: number;
  totalAmount: number;
}

export interface BookingReportResponse {
  rows: BookingReportRow[];
  summary: BookingReportSummary;
  pagination: Pagination;
}

/* ---------------- Payment Report ---------------- */

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

export interface PaymentReportSummary {
  totalPayments: number;
  totalAmount: number;
  cashAmount: number;
  upiAmount: number;
  bankAmount: number;
}

export interface PaymentReportResponse {
  rows: PaymentReportRow[];
  summary: PaymentReportSummary;
  pagination: Pagination;
}

/* ---------------- Driver Settlement ---------------- */

export interface DriverSettlementRow {
  _id: string;
  driverName: string;
  bookings: number;
  totalCollected: number;
  pendingCollection: number;
}
export interface DriverSettlementResponse {
  rows: DriverSettlementRow[];
}

/* ---------------- Daily Collection ---------------- */

export interface DailyCollectionRow {
  _id: string;
  totalPayments: number;
  cash: number;
  upi: number;
  bank: number;
  total: number;
}

export interface DailyCollectionResponse {
  rows: DailyCollectionRow[];
}
/* ---------------- Customer Ledger ---------------- */

export interface CustomerLedgerSummary {
  totalBookings: number;
  totalBookedAmount: number;
  totalPayments: number;
  outstanding: number;
}

export interface CustomerLedgerRow {
  date: string;
  type: "BOOKING" | "PAYMENT";
  reference: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface CustomerLedgerResponse {
  customer: {
    _id: string;
    name: string;
  };

  summary: CustomerLedgerSummary;

  rows: CustomerLedgerRow[];
}

export interface ExpenseReportRow {
  _id: string;
  expenseCategory: string;
  expenseSubCategory: string;
  vehicleId?: { _id: string; vehicleNumber: string } | string | null;
  driverId?: { _id: string; name: string } | string | null;
  employeeName?: string | null;
  vendor?: string | null;
  notes?: string | null;
  amount?: number | null;
  dieselAmount?: number | null;
  mileage?: number | null;
  expenseDate: string;
}
export interface ExpenseReportResponse {
  rows: ExpenseReportRow[];
  summary: { totalAmount: number; totalRecords: number; totalDiesel: number };
  pagination: Pagination;
}
export interface ProfitAndLossReport { totalRevenue: number; vehicleExpense: number; officeExpense: number; salaryExpense: number; dieselExpense: number; totalExpense: number; netProfit: number; }
