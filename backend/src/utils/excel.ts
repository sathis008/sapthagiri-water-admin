import ExcelJS from "exceljs";
import { Response } from "express";

import {
  ExportColumn,
  ExportFilter,
  ExportSummary,
} from "../types/reportExport";

interface ExcelExportOptions {
  res: Response;
  title: string;
  fileName: string;
  columns: ExportColumn[];
  rows: Record<string, any>[];
  filters?: ExportFilter[];
  summary?: ExportSummary[];
}

export const exportExcel = async ({
  res,
  title,
  fileName,
  columns,
  rows,
  filters = [],
  summary = [],
}: ExcelExportOptions) => {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "Sapthagiri Water Supply";
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet(title, {
    pageSetup: {
      paperSize: 9,
      orientation: "landscape",
      fitToPage: true,
      fitToWidth: 1,
    },
  });

  let rowIndex = 1;

  //----------------------------------------------------
  // Company Name
  //----------------------------------------------------

  worksheet.mergeCells(`A${rowIndex}:H${rowIndex}`);

  const company = worksheet.getCell(`A${rowIndex}`);

  company.value = "SAPTHAGIRI WATER SUPPLY";

  company.font = {
    bold: true,
    size: 20,
    color: {
      argb: "FFFFFF",
    },
  };

  company.alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  company.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: "1E3A8A",
    },
  };

  worksheet.getRow(rowIndex).height = 28;

  rowIndex++;

  //----------------------------------------------------
  // Report Title
  //----------------------------------------------------

  worksheet.mergeCells(`A${rowIndex}:H${rowIndex}`);

  const report = worksheet.getCell(`A${rowIndex}`);

  report.value = title;

  report.font = {
    bold: true,
    size: 15,
  };

  report.alignment = {
    horizontal: "center",
  };

  rowIndex++;

  //----------------------------------------------------
  // Generated Date
  //----------------------------------------------------

  worksheet.mergeCells(`A${rowIndex}:H${rowIndex}`);

  worksheet.getCell(`A${rowIndex}`).value =
    "Generated On : " + new Date().toLocaleString();

  worksheet.getCell(`A${rowIndex}`).alignment = {
    horizontal: "right",
  };

  worksheet.getCell(`A${rowIndex}`).font = {
    italic: true,
    color: {
      argb: "666666",
    },
  };

  rowIndex += 2;

  //----------------------------------------------------
  // Filters
  //----------------------------------------------------

  if (filters.length) {
    worksheet.getCell(`A${rowIndex}`).value = "Filters";

    worksheet.getCell(`A${rowIndex}`).font = {
      bold: true,
      size: 13,
    };

    rowIndex++;

    filters.forEach((filter) => {
      worksheet.getCell(`A${rowIndex}`).value = filter.label;

      worksheet.getCell(`B${rowIndex}`).value = filter.value ?? "All";

      rowIndex++;
    });

    rowIndex++;
  }

  //----------------------------------------------------
  // Summary
  //----------------------------------------------------

  if (summary.length) {
    worksheet.getCell(`A${rowIndex}`).value = "Summary";

    worksheet.getCell(`A${rowIndex}`).font = {
      bold: true,
      size: 13,
    };

    rowIndex++;

    summary.forEach((item) => {
      worksheet.getCell(`A${rowIndex}`).value = item.label;

      worksheet.getCell(`B${rowIndex}`).value = item.value;

      rowIndex++;
    });

    rowIndex++;
  }

  //----------------------------------------------------
  // Header
  //----------------------------------------------------

  const headerRow = worksheet.getRow(rowIndex);

  headerRow.values = columns.map((c) => c.header);

  headerRow.height = 22;

  headerRow.eachCell((cell) => {
    cell.font = {
      bold: true,
      color: {
        argb: "FFFFFF",
      },
    };

    cell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "2563EB",
      },
    };

    cell.border = {
      top: {
        style: "thin",
      },
      bottom: {
        style: "thin",
      },
      left: {
        style: "thin",
      },
      right: {
        style: "thin",
      },
    };
  });

  worksheet.autoFilter = {
    from: {
      row: rowIndex,
      column: 1,
    },
    to: {
      row: rowIndex,
      column: columns.length,
    },
  };

  worksheet.views = [
    {
      state: "frozen",
      ySplit: rowIndex,
    },
  ];

  rowIndex++;

  //----------------------------------------------------
  // Data
  //----------------------------------------------------

  rows.forEach((row, index) => {
    const excelRow = worksheet.addRow(columns.map((column) => row[column.key]));

    excelRow.eachCell((cell) => {
      cell.border = {
        top: {
          style: "thin",
        },
        bottom: {
          style: "thin",
        },
        left: {
          style: "thin",
        },
        right: {
          style: "thin",
        },
      };

      if (index % 2 === 0) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "F8FAFC",
          },
        };
      }
    });
  });

  //----------------------------------------------------
  // Auto Width
  //----------------------------------------------------

  worksheet.columns.forEach((column, index) => {
    column.width = columns[index]?.width ?? 20;
  });

  //----------------------------------------------------
  // Download
  //----------------------------------------------------

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${fileName}.xlsx"`,
  );

  await workbook.xlsx.write(res);

  res.end();
};
