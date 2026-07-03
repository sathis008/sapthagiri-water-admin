import { useMemo, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";


import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableToolbar } from "./DataTableToolbar";
import { DataTablePagination } from "./DataTablePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  loading?: boolean;

  emptyMessage?: string;

  searchColumn?: string;

  searchColumns?: string[];

  searchPlaceholder?: string;

  toolbarActions?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,

  loading = false,

  emptyMessage = "No records found.",

  searchColumn = "name",

  searchColumns,

  searchPlaceholder = "Search...",

  toolbarActions,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] =
    useState<SortingState>([]);

  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([]);

  const [searchValue, setSearchValue] =
    useState("");

  const filteredData = useMemo(() => {
    if (!searchValue.trim()) {
      return data;
    }

    const search = searchValue.toLowerCase();
    const columnsToSearch =
      searchColumns?.length
        ? searchColumns
        : [searchColumn];

    return data.filter((item) =>
      columnsToSearch.some((columnId) => {
        const value =
          (item as Record<string, unknown>)[columnId];

        return String(value ?? "")
          .toLowerCase()
          .includes(search);
      })
    );
  }, [data, searchColumns, searchColumn, searchValue]);

  const table = useReactTable({
    data: filteredData,

    columns,

    state: {
      sorting,
      columnFilters,
    },

    onSortingChange: setSorting,

    onColumnFiltersChange:
      setColumnFilters,

    getCoreRowModel:
      getCoreRowModel(),

    getFilteredRowModel:
      getFilteredRowModel(),

    getSortedRowModel:
      getSortedRowModel(),

    getPaginationRowModel:
      getPaginationRowModel(),
  });

  return (
    <div className="min-w-0 space-y-4">

      <DataTableToolbar
        table={table}
        searchColumn={searchColumn}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder={searchPlaceholder}
      >
        {toolbarActions}
      </DataTableToolbar>

      <div className="overflow-hidden rounded-md border bg-white">
        <div className="w-full overflow-x-auto">

        <Table className="min-w-[760px]">

          <TableHeader>

            {table
              .getHeaderGroups()
              .map((headerGroup) => (
                <TableRow key={headerGroup.id}>

                  {headerGroup.headers.map(
                    (header) => (
                      <TableHead key={header.id} className="px-3 py-3">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column
                                .columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  )}

                </TableRow>
              ))}

          </TableHeader>

          <TableBody>

            {loading ? (
              <TableRow>

                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center"
                >
                  Loading...
                </TableCell>

              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table
                .getRowModel()
                .rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-slate-50">

                    {row
                      .getVisibleCells()
                      .map((cell) => (
                        <TableCell key={cell.id} className="px-3 py-3">
                          {flexRender(
                            cell.column
                              .columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}

                  </TableRow>
                ))
            ) : (
              <TableRow>

                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>

              </TableRow>
            )}

          </TableBody>

        </Table>
        </div>

      </div>

      <DataTablePagination
        table={table}
      />

    </div>
  );
}
