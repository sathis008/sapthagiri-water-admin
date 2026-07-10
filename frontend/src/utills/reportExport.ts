export interface ReportExportRequest {
  search?: string;

  fromDate?: string;
  toDate?: string;

  customerId?: string;
  driverId?: string;
  vehicleId?: string;

  status?: string;
  paymentStatus?: string;

  paymentMode?: string;
  collectedBy?: string;

  columns?: string[];
}
