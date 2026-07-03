import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

import { DataTableColumnHeader } from '@/components/common/DataTable';

import type { Driver } from '@/types/driver';

import DriverRowActions from './DriverRowActions';

export const driverColumns = (
  onView: (driver: Driver) => void,
  onEdit: (driver: Driver) => void,
  onDelete: (driver: Driver) => void
): ColumnDef<Driver>[] => [
  {
    accessorKey: 'name',

    header: ({ column }) => <DataTableColumnHeader column={column} title="Driver" />,
  },

  {
    accessorKey: 'phone',

    header: ({ column }) => <DataTableColumnHeader column={column} title="Mobile" />,
  },

  {
    accessorKey: 'licenseExpiry',

    header: ({ column }) => <DataTableColumnHeader column={column} title="License Expiry" />,

    cell: ({ row }) => row.original.licenseExpiry || '-',
  },

  {
    accessorKey: 'status',

    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,

    cell: ({ row }) => (
      <Badge variant={row.original.status === 'ACTIVE' ? 'default' : 'secondary'}>
        {row.original.status}
      </Badge>
    ),
  },

  {
    id: 'actions',

    enableSorting: false,

    enableHiding: false,

    header: 'Actions',

    cell: ({ row }) => (
      <DriverRowActions driver={row.original} onView={onView} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];
