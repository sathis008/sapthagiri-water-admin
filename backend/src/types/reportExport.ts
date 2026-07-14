import { Response } from "express";

export interface ExportColumn {
  header: string;
  key: string;
  width?: number;
}

export interface ExportFilter {
  label: string;
  value: string;
}

export interface ExportSummary {
  label: string;
  value: string | number;
}

export interface PdfExportOptions {
  res: Response;

  title: string;

  fileName: string;

  columns: ExportColumn[];

  rows: Record<string, any>[];

  filters?: ExportFilter[];

  summary?: ExportSummary[];
}
