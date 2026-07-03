import type { Column } from "@tanstack/react-table";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <span className="font-semibold">
        {title}
      </span>
    );
  }

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>

        <Button
          variant="ghost"
          className="h-8 rounded-md px-2"
        >
          <span className="whitespace-nowrap">{title}</span>

          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">

        <DropdownMenuItem
          onClick={() => column.toggleSorting(false)}
        >
          <ArrowUp className="mr-2 h-4 w-4" />
          Ascending
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => column.toggleSorting(true)}
        >
          <ArrowDown className="mr-2 h-4 w-4" />
          Descending
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}
