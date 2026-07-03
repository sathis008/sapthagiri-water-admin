import type {
  Table,
} from "@tanstack/react-table";
import { Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: Props<TData>) {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>

        <Button variant="outline" className="h-10 w-full rounded-md sm:h-9 sm:w-auto">

          <Settings2 className="mr-2 h-4 w-4" />

          View

        </Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        <DropdownMenuLabel>

          Toggle Columns

        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(value) =>
                column.toggleVisibility(!!value)
              }
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}

      </DropdownMenuContent>

    </DropdownMenu>
  );
}
