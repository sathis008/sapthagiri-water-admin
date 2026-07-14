import type { ReactNode } from "react";

import { Search, RefreshCcw, FileSpreadsheet, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ReportToolbarProps {
  showSearch?: boolean;
  search: string;

  onSearchChange: (value: string) => void;

  onRefresh: () => void;

  onExportExcel: () => void;

  onExportPDF: () => void;

  filters?: ReactNode;

  columnSelector?: ReactNode;
}

const ReportToolbar = ({
  search,
  onSearchChange,
  onRefresh,
  onExportExcel,
  onExportPDF,
  filters,
  columnSelector,
  showSearch = true,
}: ReportToolbarProps) => {
  return (
    <div className="space-y-4">
      {/* Top Row */}

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[280px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          {showSearch && (
            <Input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search..."
            />
          )}
        </div>

        <Button variant="outline" onClick={onRefresh}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>

        {columnSelector}

        <Button variant="outline" onClick={onExportExcel}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Excel
        </Button>

        <Button variant="outline" onClick={onExportPDF}>
          <FileText className="mr-2 h-4 w-4" />
          PDF
        </Button>
      </div>

      {/* Filters */}

      {filters}
    </div>
  );
};

export default ReportToolbar;
