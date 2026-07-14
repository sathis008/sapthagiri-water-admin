import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/common/DataTable';

import type { Vehicle } from '@/types/vehicle';

import VehicleRowActions from './VehicleRowActions';
export const vehicleColumns = (
  onView: (vehicle: Vehicle) => void,
  onEdit: (vehicle: Vehicle) => void,
  onDelete: (vehicle: Vehicle) => void
): ColumnDef<Vehicle>[] => [
  {
    accessorKey: 'vehicleNumber',

    header: ({ column }) => <DataTableColumnHeader column={column} title="Vehicle No" />,
  },

  {
    accessorKey: 'capacity',

    header: ({ column }) => <DataTableColumnHeader column={column} title="Capacity" />,
  },

  {
    accessorKey: 'manufacturer',

    header: ({ column }) => <DataTableColumnHeader column={column} title="Manufacturer" />,

    cell: ({ row }) => row.original.manufacturer || '-',
  },

  {
    accessorKey: 'insuranceExpiry',

    header: ({ column }) => <DataTableColumnHeader column={column} title="Insurance" />,

    cell: ({ row }) =>
      row.original.insuranceExpiry
        ? new Date(row.original.insuranceExpiry).toLocaleDateString()
        : '-',
  },

  {
    accessorKey: 'status',

    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,

    cell: ({ row }) => {
      const status = row.original.status;

      return <Badge variant={status === 'AVAILABLE' ? 'default' : 'secondary'}>{status}</Badge>;
    },
  },

  {
    id: 'actions',

    enableSorting: false,

    enableHiding: false,

    header: 'Actions',

    cell: ({ row }) => (
      <VehicleRowActions
        vehicle={row.original}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  },
];
