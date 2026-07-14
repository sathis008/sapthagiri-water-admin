import { X } from 'lucide-react';
import type { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataTableViewOptions } from '@/components/common/DataTable/DataTableViewOptions';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;

  searchColumn?: string;

  searchValue?: string;

  onSearchChange?: (value: string) => void;

  searchPlaceholder?: string;

  children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  searchColumn = 'name',
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  children,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0 || Boolean(searchValue?.trim());

  const searchInputValue = onSearchChange
    ? (searchValue ?? '')
    : ((table.getColumn(searchColumn)?.getFilterValue() as string) ?? '');

  return (
    <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4">
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <Input
          placeholder={searchPlaceholder}
          value={searchInputValue}
          onChange={(event) => {
            const value = event.target.value;
            if (onSearchChange) {
              onSearchChange(value);
              return;
            }

            table.getColumn(searchColumn)?.setFilterValue(value);
          }}
          className="h-10 w-full rounded-md sm:h-9 sm:w-[250px]"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            className="h-10 justify-center rounded-md sm:h-9"
            onClick={() => {
              onSearchChange?.('');
              table.resetColumnFilters();
            }}
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">{children}</div>
      </div>

      <div className="flex sm:justify-end">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
