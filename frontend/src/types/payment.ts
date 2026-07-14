export type PaymentMode = "CASH" | "UPI" | "BANK";

export type CollectedBy = "DRIVER" | "MANAGER" | "OFFICE";

export interface Payment {
  _id: string;

  paymentNumber: string;

  customerId: string;

  customerName: string;

  totalAmount: number;

  paymentMode: PaymentMode;

  collectedBy: CollectedBy;

  driverId?: string;

  driverName?: string;

  paymentDate: string;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}

export interface PaymentItem {
  _id: string;

  bookingId: string;

  bookingNumber: string;

  bookingDate: string;

  capacity: number;

  amount: number;
}

export interface PaymentListResponse {
  success: boolean;

  data: Payment[];

  pagination: {
    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };
}

export interface CreatePaymentRequest {
  customerId: string;

  bookingIds: string[];

  paymentMode: PaymentMode;

  collectedBy: CollectedBy;

  driverId?: string;

  notes?: string;
}
