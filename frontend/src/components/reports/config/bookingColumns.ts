export interface ReportColumn {
  id: string;
  label: string;
  defaultVisible: boolean;
}

export const bookingColumns: ReportColumn[] = [
  {
    id: "bookingNumber",
    label: "Booking No",
    defaultVisible: true,
  },
  {
    id: "bookingDate",
    label: "Booking Date",
    defaultVisible: true,
  },
  {
    id: "customerName",
    label: "Customer",
    defaultVisible: true,
  },
  {
    id: "driverName",
    label: "Driver",
    defaultVisible: true,
  },
  {
    id: "vehicleNumber",
    label: "Vehicle",
    defaultVisible: true,
  },
  {
    id: "capacity",
    label: "Capacity",
    defaultVisible: true,
  },
  {
    id: "price",
    label: "Amount",
    defaultVisible: true,
  },
  {
    id: "status",
    label: "Status",
    defaultVisible: true,
  },
  {
    id: "paymentStatus",
    label: "Payment Status",
    defaultVisible: true,
  },
];
