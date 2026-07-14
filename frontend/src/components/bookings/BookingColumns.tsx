import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

import BookingRowActions from './BookingRowActions';

import type { Booking } from '@/types/booking';

interface BookingColumnProps {
  onView: (booking: Booking) => void;

  onEdit: (booking: Booking) => void;

  onAssign: (booking: Booking) => void;

  onComplete: (booking: Booking) => void;

  onDelete: (booking: Booking) => void;
}

const getStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'CONFIRMED':
      return 'secondary';

    case 'ASSIGNED':
      return 'default';

    case 'DELIVERED':
      return 'outline';

    case 'CANCELLED':
      return 'destructive';

    default:
      return 'secondary';
  }
};

const getPaymentVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'PAID':
      return 'default';

    case 'PENDING':
      return 'secondary';

    default:
      return 'secondary';
  }
};

export const bookingColumns = ({
  onView,
  onEdit,
  onAssign,
  onComplete,
  onDelete,
}: BookingColumnProps): ColumnDef<Booking>[] => [
  {
    accessorKey: 'bookingNumber',

    header: 'Booking No',
  },

  {
    accessorKey: 'customerName',

    header: 'Customer',
  },

  {
    accessorKey: 'phone',

    header: 'Mobile',
  },

  {
    accessorKey: 'bookingDate',

    header: 'Booking Date',

    cell: ({ row }) => new Date(row.original.bookingDate).toLocaleDateString(),
  },

  {
    accessorKey: 'vehicleNumber',

    header: 'Vehicle',

    cell: ({ row }) => row.original.vehicleNumber || '-',
  },

  {
    accessorKey: 'driverName',

    header: 'Driver',

    cell: ({ row }) => row.original.driverName || '-',
  },

  {
    accessorKey: 'price',

    header: 'Amount',

    cell: ({ row }) => `₹${row.original.price}`,
  },

  {
    accessorKey: 'status',

    header: 'Status',

    cell: ({ row }) => (
      <Badge variant={getStatusVariant(row.original.status)}>{row.original.status}</Badge>
    ),
  },

  {
    accessorKey: 'paymentStatus',

    header: 'Payment',

    cell: ({ row }) => (
      <Badge variant={getPaymentVariant(row.original.paymentStatus)}>
        {row.original.paymentStatus}
      </Badge>
    ),
  },

  {
    id: 'actions',

    header: 'Actions',

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
