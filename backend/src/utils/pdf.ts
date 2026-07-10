import PDFDocument from "pdfkit";
import { PdfExportOptions } from "../types/reportExport";

const PAGE_MARGIN = 40;
const ROW_HEIGHT = 28;
const HEADER_COLOR = "#F8FAFC";
const BORDER_COLOR = "#BDBDBD";
const ZEBRA_COLOR = "#F8FAFC";

const drawLine = (doc: PDFKit.PDFDocument, y: number) => {
  doc
    .strokeColor(BORDER_COLOR)
    .lineWidth(1)
    .moveTo(PAGE_MARGIN, y)
    .lineTo(doc.page.width - PAGE_MARGIN, y)
    .stroke();
};

const drawCompanyHeader = (doc: PDFKit.PDFDocument, title: string) => {
  const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;

  let y = PAGE_MARGIN;

  doc
    .font("Helvetica-Bold")
    .fontSize(22)
    .fillColor("#111827")
    .text("SAPTHAGIRI WATER SUPPLY", PAGE_MARGIN, y, {
      width,
      align: "center",
    });

  y += 30;

  doc.font("Helvetica-Bold").fontSize(16).text(title, PAGE_MARGIN, y, {
    width,
    align: "center",
  });

  y += 25;

  drawLine(doc, y);

  return y + 15;
};

const drawFilters = (
  doc: PDFKit.PDFDocument,
  filters: {
    label: string;
    value: any;
  }[],
  y: number,
) => {
  if (!filters.length) return y;

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#111827")
    .text("Filters", PAGE_MARGIN, y);

  y += 20;

  doc.font("Helvetica").fontSize(11);

  filters.forEach((item) => {
    doc.text(`${item.label} : ${item.value || "All"}`, PAGE_MARGIN + 5, y);

    y += 18;
  });

  return y + 8;
};

const drawSummary = (
  doc: PDFKit.PDFDocument,
  summary: {
    label: string;
    value: any;
  }[],
  y: number,
) => {
  if (!summary.length) return y;

  doc.font("Helvetica-Bold").fontSize(13).text("Summary", PAGE_MARGIN, y);

  y += 20;

  const boxWidth = 240;
  const boxHeight = summary.length * 24 + 15;

  doc
    .roundedRect(PAGE_MARGIN, y, boxWidth, boxHeight, 5)
    .strokeColor(BORDER_COLOR)
    .stroke();

  let yy = y + 10;

  summary.forEach((item) => {
    doc.font("Helvetica-Bold").fontSize(11);

    doc.text(item.label, PAGE_MARGIN + 10, yy);

    doc.font("Helvetica").text(String(item.value), PAGE_MARGIN + 120, yy, {
      width: 100,
      align: "right",
    });

    yy += 22;
  });

  return y + boxHeight + 20;
};

const drawTableHeader = (
  doc: PDFKit.PDFDocument,
  columns: {
    header: string;
    width?: number;
  }[],
  y: number,
) => {
  let x = PAGE_MARGIN;

  doc.font("Helvetica-Bold").fontSize(10);

  columns.forEach((column) => {
    const width = column.width ?? 90;

    doc.rect(x, y, width, ROW_HEIGHT).fillAndStroke(HEADER_COLOR, BORDER_COLOR);

    doc.fillColor("white").text(column.header, x + 3, y + 8, {
      width: width - 6,
      align: "center",
    });

    x += width;
  });

  doc.fillColor("black");

  return y + ROW_HEIGHT;
};

export const exportPDF = ({
  res,
  title,
  fileName,
  columns,
  rows,
  filters = [],
  summary = [],
}: PdfExportOptions) => {
  const doc = new PDFDocument({
    margin: PAGE_MARGIN,
    size: "A4",
  });

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${fileName}.pdf"`,
  );

  doc.pipe(res);

  let y = drawCompanyHeader(doc, title);

  y = drawFilters(doc, filters, y);

  y = drawSummary(doc, summary, y);

  y = drawTableHeader(doc, columns, y);

  doc.font("Helvetica").fontSize(9);
  rows.forEach((row, index) => {
    // ---------------------------------------
    // Page Break
    // ---------------------------------------

    if (y > 730) {
      doc.addPage();

      y = drawCompanyHeader(doc, title);

      y = drawTableHeader(doc, columns, y);
    }

    let x = PAGE_MARGIN;

    // ---------------------------------------
    // Zebra Row Background
    // ---------------------------------------

    if (index % 2 === 0) {
      doc
        .rect(
          PAGE_MARGIN,
          y,
          columns.reduce((t, c) => t + (c.width ?? 90), 0),
          ROW_HEIGHT,
        )
        .fill(ZEBRA_COLOR);

      doc.fillColor("black");
    }

    // ---------------------------------------
    // Draw Cells
    // ---------------------------------------

    columns.forEach((column) => {
      const width = column.width ?? 90;

      doc.rect(x, y, width, ROW_HEIGHT).strokeColor(BORDER_COLOR).stroke();

      let value = row[column.key] ?? "";

      if (column.key === "sNo") {
        value = index + 1;
      }

      const align = [
        "price",
        "amount",
        "capacity",
        "cash",
        "upi",
        "bank",
        "total",
      ].includes(column.key)
        ? "right"
        : "center";

      doc.text(String(value), x + 3, y + 8, {
        width: width - 6,
        align,
        lineBreak: false,
        ellipsis: true,
      });

      x += width;
    });

    y += ROW_HEIGHT;
  });

  //-----------------------------------------
  // Total Row
  //-----------------------------------------

  if (summary.length) {
    let x = PAGE_MARGIN;

    doc.font("Helvetica-Bold");

    columns.forEach((column) => {
      const width = column.width ?? 90;

      doc.rect(x, y, width, ROW_HEIGHT).fillAndStroke("#E5E7EB", BORDER_COLOR);

      let value = "";

      switch (column.key) {
        case "customerName":
          value = "TOTAL";
          break;

        case "capacity":
          value = String(
            summary.find((item) =>
              item.label.toLowerCase().includes("capacity"),
            )?.value ?? "",
          );
          break;

        case "price":
        case "amount":
        case "total":
          value = String(
            summary.find(
              (item) =>
                item.label.toLowerCase().includes("amount") ||
                item.label.toLowerCase().includes("total"),
            )?.value ?? "",
          );
          break;
      }

      const align = ["capacity", "price", "amount", "total"].includes(
        column.key,
      )
        ? "right"
        : "center";

      doc.fillColor("black").text(String(value), x + 3, y + 8, {
        width: width - 6,
        align,
        lineBreak: false,
      });

      x += width;
    });

    y += ROW_HEIGHT;
  }

  //-----------------------------------------
  // Footer
  //-----------------------------------------

  drawLine(doc, doc.page.height - 55);

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("gray")
    .text(
      `Generated On : ${new Date().toLocaleString()}`,
      PAGE_MARGIN,
      doc.page.height - 42,
    );

  doc.text(`Page ${doc.bufferedPageRange().count}`, 0, doc.page.height - 42, {
    width: doc.page.width - PAGE_MARGIN,
    align: "right",
  });

  doc.end();
};
