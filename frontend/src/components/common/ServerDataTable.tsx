import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ServerDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];

  data: TData[];

  loading?: boolean;
}

function ServerDataTable<TData, TValue>({
  columns,
  data,
  loading = false,
}: ServerDataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,

    columns,

    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-lg border bg-background">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-40 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : data.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-40 text-center">
                No records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ServerDataTable;
