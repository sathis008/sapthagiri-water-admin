import { useEffect, useState } from "react";

import { Eye } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";

export interface ReportColumn {
  id: string;
  label: string;
  defaultVisible?: boolean;
}

interface ReportColumnSelectorProps {
  storageKey: string;

  columns: ReportColumn[];

  onApply: (columns: string[]) => void;
}

const ReportColumnSelector = ({
  storageKey,
  columns,
  onApply,
}: ReportColumnSelectorProps) => {
  const defaultColumns = columns
    .filter((item) => item.defaultVisible)
    .map((item) => item.id);

  const [selectedColumns, setSelectedColumns] =
    useState<string[]>(defaultColumns);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      const parsed = JSON.parse(saved);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedColumns(parsed);

      onApply(parsed);
    } else {
      onApply(defaultColumns);
    }
  }, []);

  const toggleColumn = (id: string) => {
    setSelectedColumns((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };

  const apply = () => {
    if (!selectedColumns.length) {
      return;
    }

    localStorage.setItem(storageKey, JSON.stringify(selectedColumns));

    onApply(selectedColumns);
  };

  const selectAll = () => {
    setSelectedColumns(columns.map((item) => item.id));
  };

  const clearAll = () => {
    setSelectedColumns([]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 space-y-2 p-4" align="end">
        {columns.map((column) => (
          <div key={column.id} className="flex items-center gap-2">
            <Checkbox
              checked={selectedColumns.includes(column.id)}
              onCheckedChange={() => toggleColumn(column.id)}
            />

            <span>{column.label}</span>
          </div>
        ))}

        <div className="mt-4 flex justify-between">
          <Button size="sm" variant="outline" onClick={selectAll}>
            Select All
          </Button>

          <Button size="sm" variant="outline" onClick={clearAll}>
            Clear
          </Button>
        </div>

        <Button className="mt-3 w-full" onClick={apply}>
          Apply
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReportColumnSelector;
