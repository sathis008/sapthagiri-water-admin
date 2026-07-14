export interface ExportRequest {
  search?: string;

  fromDate?: string;

  toDate?: string;

  customerId?: string;

  driverId?: string;

  vehicleId?: string;

  paymentStatus?: string;

  paymentMode?: string;

  collectedBy?: string;

  status?: string;

  columns?: string[];
}
