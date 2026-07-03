import type { Table } from '@tanstack/react-table';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
      <div className="text-sm text-muted-foreground">
        Total {table.getFilteredRowModel().rows.length} row(s)
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        {/* Rows Per Page */}

        <div className="flex items-center justify-between gap-2 sm:justify-start">
          <span className="text-sm">Rows</span>

          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-9 w-20 rounded-md">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {[10, 20, 30, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page Number */}

        <div className="text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1}
          {' of '}
          {table.getPageCount()}
        </div>

        {/* Navigation */}

        <div className="grid grid-cols-4 gap-1 sm:flex sm:items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-full rounded-md sm:w-9"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-full rounded-md sm:w-9"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-full rounded-md sm:w-9"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-full rounded-md sm:w-9"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
