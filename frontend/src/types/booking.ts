export type BookingStatus =
  "CONFIRMED" | "ASSIGNED" | "DELIVERED" | "CANCELLED";

export type PaymentStatus = "PENDING" | "PAID";

export type CollectionMethod =
  "DRIVER_COLLECTION" | "ACCOUNT_COLLECTION" | "OFFICE_COLLECTION";

export interface Booking {
  _id: string;

  bookingNumber: string;

  customerId: string;

  customerName: string;

  phone: string;

  address: string;

  capacity: number;

  price: number;

  bookingDate: string;

  status: BookingStatus;

  paymentStatus: PaymentStatus;

  collectionMethod?: CollectionMethod;

  vehicleId?: string;

  vehicleNumber?: string;

  driverId?: string;

  driverName?: string;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}

export interface Pagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface BookingListResponse {
  success: boolean;

  data: Booking[];

  pagination: Pagination;
}

export interface CreateBookingRequest {
  customerId: string;

  capacity: string;

  price: number;

  bookingDate: string;

  notes?: string;
}

export type UpdateBookingRequest = CreateBookingRequest;

export interface AssignBookingRequest {
  vehicleId: string;

  driverId: string;

  notes?: string;
}

export interface CompleteDeliveryRequest {
  collectionMethod: CollectionMethod;

  notes?: string;
}
