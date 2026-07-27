import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import BookingRowActions from "./BookingRowActions";
import type { Booking } from "@/types/booking";

interface BookingColumnProps {
  onView: (booking: Booking) => void;
  onEdit: (booking: Booking) => void;
  onAssign: (booking: Booking) => void;
  onComplete: (booking: Booking) => void;
  onDelete: (booking: Booking) => void;
}

const STATUS_STYLES: Record<string, string> = {
  CONFIRMED: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  ASSIGNED: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  DELIVERED: "bg-green-100 text-green-700 hover:bg-green-100",
  CANCELLED: "bg-red-100 text-red-700 hover:bg-red-100",
};

const PAYMENT_STYLES: Record<string, string> = {
  PAID: "bg-green-100 text-green-700 hover:bg-green-100",
  PENDING: "bg-orange-100 text-orange-700 hover:bg-orange-100",
};

const COLLECTION_LABELS: Record<string, string> = {
  DRIVER_COLLECTION: "Driver Collection",
  ACCOUNT_COLLECTION: "Account Collection",
  OFFICE_COLLECTION: "Office Collection",
};

export const bookingColumns = ({
  onView,
  onEdit,
  onAssign,
  onComplete,
  onDelete,
}: BookingColumnProps): ColumnDef<Booking>[] => [
  {
    accessorKey: "bookingNumber",
    header: "Booking No",
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "phone",
    header: "Mobile",
  },
  {
    accessorKey: "bookingDate",
    header: "Date",
    cell: ({ row }) =>
      new Date(row.original.bookingDate).toLocaleDateString("en-IN"),
  },
  {
    accessorKey: "vehicleNumber",
    header: "Vehicle",
    cell: ({ row }) => row.original.vehicleNumber || "-",
  },
  {
    accessorKey: "driverName",
    header: "Driver",
    cell: ({ row }) => row.original.driverName || "-",
  },
  {
    accessorKey: "collectionMethod",
    header: "Collection",
    cell: ({ row }) => {
      const m = row.original.collectionMethod;
      return m ? (
        <Badge variant="outline">{COLLECTION_LABELS[m] ?? m}</Badge>
      ) : (
        <span className="text-slate-400">-</span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Amount",
    cell: ({ row }) => `₹${row.original.price.toLocaleString("en-IN")}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={STATUS_STYLES[row.original.status] ?? ""}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => (
      <Badge className={PAYMENT_STYLES[row.original.paymentStatus] ?? ""}>
        {row.original.paymentStatus}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <BookingRowActions
        booking={row.original}
        onView={onView}
        onEdit={onEdit}
        onAssign={onAssign}
        onComplete={onComplete}
        onDelete={onDelete}
      />
    ),
  },
];
