export interface CreatePaymentRequest {
  customerId: string;

  bookingIds: string[];

  paymentMode: "CASH" | "UPI" | "BANK";

  collectedBy: "DRIVER" | "MANAGER" | "OFFICE";

  driverId?: string;

  notes?: string;
}
