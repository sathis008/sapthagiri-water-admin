import type { Booking } from "./booking";
import type { Payment } from "./payment";

export interface DashboardSummary {
  todayBookings: number;

  todayDeliveries: number;

  pendingCollections: number;

  todayRevenue: number;

  totalCustomers: number;

  totalDrivers: number;

  totalVehicles: number;

  // Added for Manager dashboard
  pendingDeliveries?: number;
}

export interface BookingStatus {
  CONFIRMED: number;

  ASSIGNED: number;

  DELIVERED: number;

  CANCELLED: number;
}

export interface PaymentMode {
  CASH: {
    count: number;

    amount: number;
  };

  UPI: {
    count: number;

    amount: number;
  };

  BANK: {
    count: number;

    amount: number;
  };
}

export interface BookingTrend {
  date: string;

  bookings: number;

  deliveries: number;
}

export interface DashboardData {
  summary: DashboardSummary;

  bookingStatus: BookingStatus;

  paymentMode: PaymentMode;

  bookingTrend: BookingTrend[];

  recentBookings: Booking[];

  recentPayments: Payment[];

  topCustomer: TopCustomer | null;

  topDriver: TopDriver | null;

  topVehicle: TopVehicle | null;
}

export interface DashboardResponse {
  success: boolean;

  message: string;

  data: DashboardData;
}

export interface TopCustomer {
  customerName: string;
  totalBookings: number;
  totalAmount: number;
}

export interface TopDriver {
  driverName: string;
  deliveries: number;
}

export interface TopVehicle {
  vehicleNumber: string;
  deliveries: number;
}
