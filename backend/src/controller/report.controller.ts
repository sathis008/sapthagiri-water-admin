import { Request, Response } from "express";

import Booking from "../models/booking.model";

import { buildBookingFilter, buildPaymentFilter } from "../utils/reportFilter";
import { getPagination } from "../utils/pagination";
import { successResponse, errorResponse } from "../utils/response";
import Customer from "../models/customer.model";
import Payment from "../models/payment.model";
import { exportExcel } from "../utils/excel";
import { exportPDF } from "../utils/pdf";
import {
  bookingReportExcelColumns,
  bookingReportPdfColumns,
  customerLedgerExcelColumns,
  customerLedgerPdfColumns,
  dailyCollectionExcelColumns,
  dailyCollectionPdfColumns,
  driverSettlementExcelColumns,
  driverSettlementPdfColumns,
  getSelectedColumns,
  paymentReportExcelColumns,
  paymentReportPdfColumns,
} from "../utils/reportColumns";

/**
 * Booking Report Data
 */
const getBookingReportData = async (source: Request | Record<string, any>) => {
  const isRequest = "query" in source;

  const params = isRequest ? source.query : source;

  const filter = buildBookingFilter({
    search: params.search as string,
    customerId: params.customerId as string,
    driverId: params.driverId as string,
    vehicleId: params.vehicleId as string,
    status: params.status as string,
    paymentStatus: params.paymentStatus as string,
    fromDate: params.fromDate as string,
    toDate: params.toDate as string,
  });

  const page = Number(params.page ?? 1);
  const limit = Number(params.limit ?? 10);
  const skip = (page - 1) * limit;

  const [rows, total, summary] = await Promise.all([
    Booking.find(filter)
      .sort({ bookingDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    Booking.countDocuments(filter),

    Booking.aggregate([
      {
        $match: filter,
      },
      {
        $group: {
          _id: null,

          totalBookings: {
            $sum: 1,
          },

          totalCapacity: {
            $sum: "$capacity",
          },

          totalAmount: {
            $sum: "$price",
          },
        },
      },
    ]),
  ]);

  return {
    rows,

    summary: summary[0] ?? {
      totalBookings: 0,
      totalCapacity: 0,
      totalAmount: 0,
    },

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Driver Settlement Data
 */
const getDriverSettlementData = async () => {
  return Booking.aggregate([
    {
      $match: {
        driverId: {
          $ne: null,
        },

        status: "DELIVERED",
      },
    },

    {
      $group: {
        _id: "$driverId",

        driverName: {
          $first: "$driverName",
        },

        bookings: {
          $sum: 1,
        },

        totalCollected: {
          $sum: "$price",
        },

        pendingCollection: {
          $sum: {
            $cond: [
              {
                $eq: ["$paymentStatus", "PENDING"],
              },
              "$price",
              0,
            ],
          },
        },
      },
    },

    {
      $sort: {
        driverName: 1,
      },
    },
  ]);
};

/**
 * Payment Report Data
 */
const getPaymentReportData = async (source: Request | Record<string, any>) => {
  const isRequest = "query" in source;

  const params = isRequest ? source.query : source;
  const filter = buildPaymentFilter({
    search: params.search as string,
    customerId: params.customerId as string,
    driverId: params.driverId as string,
    collectedBy: params.collectedBy as string,
    paymentMode: params.paymentMode as string,
    fromDate: params.fromDate as string,
    toDate: params.toDate as string,
  });

  const { page, limit, skip } = getPagination(params);

  const [rows, total, summary] = await Promise.all([
    Payment.find(filter)
      .sort({
        paymentDate: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean(),

    Payment.countDocuments(filter),

    Payment.aggregate([
      {
        $match: filter,
      },
      {
        $group: {
          _id: null,

          totalPayments: {
            $sum: 1,
          },

          totalAmount: {
            $sum: "$totalAmount",
          },

          cashAmount: {
            $sum: {
              $cond: [
                {
                  $eq: ["$paymentMode", "CASH"],
                },
                "$totalAmount",
                0,
              ],
            },
          },

          upiAmount: {
            $sum: {
              $cond: [
                {
                  $eq: ["$paymentMode", "UPI"],
                },
                "$totalAmount",
                0,
              ],
            },
          },

          bankAmount: {
            $sum: {
              $cond: [
                {
                  $eq: ["$paymentMode", "BANK"],
                },
                "$totalAmount",
                0,
              ],
            },
          },
        },
      },
    ]),
  ]);

  return {
    rows,

    summary: summary[0] ?? {
      totalPayments: 0,
      totalAmount: 0,
      cashAmount: 0,
      upiAmount: 0,
      bankAmount: 0,
    },

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Daily Collection Data
 */
const getDailyCollectionData = async (
  source: Request | Record<string, any>,
) => {
  const isRequest = "query" in source;
  const params = isRequest ? (source as Request).query : source;

  const fromDate = params.fromDate as string;
  const toDate = params.toDate as string;
  const customerId = params.customerId as string;
  const driverId = params.driverId as string;
  const vehicleId = params.vehicleId as string;

  // Build payment filter
  const filter: any = {};

  if (fromDate || toDate) {
    filter.paymentDate = {};
    if (fromDate) filter.paymentDate.$gte = new Date(fromDate);
    if (toDate) {
      const end = new Date(toDate);
      end.setHours(23, 59, 59, 999);
      filter.paymentDate.$lte = end;
    }
  }

  if (customerId) filter.customerId = customerId;
  if (driverId) filter.collectedBy = driverId; // payments linked via collectedBy driver

  // If vehicleId filter is requested, first find bookings for that vehicle
  // and then filter payments linked to those bookings
  let bookingIdFilter: string[] | null = null;
  if (vehicleId) {
    const Booking = (await import("../models/booking.model")).default;
    const bookings = await Booking.find({ vehicleId }).select("_id").lean();
    bookingIdFilter = bookings.map((b: any) => b._id.toString());
    if (bookingIdFilter.length > 0) {
      filter["paymentItems.bookingId"] = { $in: bookingIdFilter };
    } else {
      // No bookings for that vehicle — return empty
      return {
        rows: [],
        summary: { cash: 0, upi: 0, bank: 0, total: 0, totalPayments: 0 },
      };
    }
  }

  const rows = await Payment.aggregate([
    { $match: filter },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$paymentDate" },
        },
        totalPayments: { $sum: 1 },
        cash: {
          $sum: {
            $cond: [{ $eq: ["$paymentMode", "CASH"] }, "$totalAmount", 0],
          },
        },
        upi: {
          $sum: {
            $cond: [{ $eq: ["$paymentMode", "UPI"] }, "$totalAmount", 0],
          },
        },
        bank: {
          $sum: {
            $cond: [{ $eq: ["$paymentMode", "BANK"] }, "$totalAmount", 0],
          },
        },
        total: { $sum: "$totalAmount" },
      },
    },
    { $sort: { _id: -1 } },
  ]);

  const summary = {
    cash: rows.reduce((t, r) => t + r.cash, 0),
    upi: rows.reduce((t, r) => t + r.upi, 0),
    bank: rows.reduce((t, r) => t + r.bank, 0),
    total: rows.reduce((t, r) => t + r.total, 0),
    totalPayments: rows.reduce((t, r) => t + r.totalPayments, 0),
  };

  return { rows, summary };
};

/**
 * Booking Report
 */
export const getBookingReport = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await getBookingReportData(req);

    successResponse(res, "Booking report fetched successfully.", data);
  } catch (error) {
    errorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
};

export const exportBookingExcel = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await getBookingReportData(req.body);
    const columns = getSelectedColumns(
      bookingReportExcelColumns,
      req.body.columns,
    );

    const pdfRows = data.rows.map((row, index) => ({
      sNo: index + 1,
      bookingNumber: row.bookingNumber,
      bookingDate: new Date(row.bookingDate).toLocaleDateString("en-IN"),
      customerName: row.customerName,
      vehicleNumber: row.vehicleNumber,
      capacity: Number(row.capacity).toLocaleString("en-IN"),
      price: Number(row.price),
    }));

    await exportExcel({
      res,

      title: "Booking Report",

      fileName: "booking-report",

      columns: columns,

      rows: pdfRows,

      filters: [
        {
          label: "From Date",
          value: req.body.fromDate || "All",
        },
        {
          label: "To Date",
          value: req.body.toDate || "All",
        },
        {
          label: "Customer",
          value: req.body.customerId || "All",
        },
        {
          label: "Driver",
          value: req.body.driverId || "All",
        },
        {
          label: "Vehicle",
          value: req.body.vehicleId || "All",
        },
        {
          label: "Status",
          value: req.body.status || "All",
        },
        {
          label: "Payment Status",
          value: req.body.paymentStatus || "All",
        },
      ],

      summary: [
        {
          label: "Total Bookings",
          value: data.summary.totalBookings,
        },
        {
          label: "Total Capacity",
          value: data.summary.totalCapacity,
        },
        {
          label: "Total Amount",
          value: `₹${Number(data.summary.totalAmount).toLocaleString("en-IN")}`,
        },
      ],
    });
  } catch (error) {
    errorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Export failed",
    );
  }
};
export const exportBookingPDF = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await getBookingReportData(req.body);
    const columns = getSelectedColumns(
      bookingReportPdfColumns,
      req.body.columns,
    );

    const pdfRows = data.rows.map((row, index) => ({
      sNo: index + 1,
      bookingNumber: row.bookingNumber,
      bookingDate: new Date(row.bookingDate).toLocaleDateString("en-IN"),
      customerName: row.customerName,
      vehicleNumber: row.vehicleNumber,
      capacity: Number(row.capacity).toLocaleString("en-IN"),
      price: Number(row.price),
    }));

    exportPDF({
      res,

      title: "Booking Report",

      fileName: "booking-report",

      columns: columns,

      rows: pdfRows,

      filters: [
        {
          label: "From Date",
          value: req.body.fromDate || "All",
        },
        {
          label: "To Date",
          value: req.body.toDate || "All",
        },
        {
          label: "Customer",
          value: req.body.customerId || "All",
        },
        {
          label: "Driver",
          value: req.body.driverId || "All",
        },
        {
          label: "Vehicle",
          value: req.body.vehicleId || "All",
        },
        {
          label: "Status",
          value: req.body.status || "All",
        },
        {
          label: "Payment Status",
          value: req.body.paymentStatus || "All",
        },
      ],

      summary: [
        {
          label: "Total Bookings",
          value: data.summary.totalBookings,
        },
        {
          label: "Total Capacity",
          value: data.summary.totalCapacity,
        },
        {
          label: "Total Amount",
          value: `₹${Number(data.summary.totalAmount).toLocaleString("en-IN")}`,
        },
      ],
    });
  } catch (error) {
    errorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Export failed",
    );
  }
};

/**
 * Payment Report
 */
export const getPaymentReport = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await getPaymentReportData(req);

    successResponse(res, "Payment report fetched successfully.", data);
  } catch (error) {
    errorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
};

export const exportPaymentExcel = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await getPaymentReportData(req);
    const columns = getSelectedColumns(
      paymentReportExcelColumns,
      req.body.columns,
    );

    await exportExcel({
      res,

      title: "Payment Report",

      fileName: "payment-report",

      columns: columns,

      rows: data.rows,

      filters: [],

      summary: [
        {
          label: "Total Payments",
          value: data.summary.totalPayments,
        },
        {
          label: "Total Amount",
          value: `₹${Number(data.summary.totalAmount).toLocaleString("en-IN")}`,
        },
        {
          label: "Cash",
          value: `₹${data.summary.cashAmount}`,
        },
        {
          label: "UPI",
          value: `₹${data.summary.upiAmount}`,
        },
        {
          label: "Bank",
          value: `₹${data.summary.bankAmount}`,
        },
      ],
    });
  } catch (error) {
    errorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Export failed",
    );
  }
};
export const exportPaymentPDF = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await getPaymentReportData(req);
    const columns = getSelectedColumns(
      paymentReportPdfColumns,
      req.body.columns,
    );

    exportPDF({
      res,

      title: "Payment Report",

      fileName: "payment-report",

      columns: columns,

      rows: data.rows,

      filters: [],

      summary: [
        {
          label: "Total Payments",
          value: data.summary.totalPayments,
        },
        {
          label: "Total Amount",
          value: `₹${Number(data.summary.totalAmount).toLocaleString("en-IN")}`,
        },
        {
          label: "Cash",
          value: `₹${data.summary.cashAmount}`,
        },
        {
          label: "UPI",
          value: `₹${data.summary.upiAmount}`,
        },
        {
          label: "Bank",
          value: `₹${data.summary.bankAmount}`,
        },
      ],
    });
  } catch (error) {
    errorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Export failed",
    );
  }
};

export const getDriverSettlement = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const rows = await getDriverSettlementData();

    successResponse(res, "Driver settlement fetched successfully.", {
      rows,
    });
  } catch (error) {
    errorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
};

export const exportDriverSettlementExcel = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const rows = await getDriverSettlementData();
    const columns = getSelectedColumns(
      driverSettlementExcelColumns,
      req.body.columns,
    );

    await exportExcel({
      res,

      title: "Driver Settlement",

      fileName: "driver-settlement",

      columns: columns,

      rows,

      filters: [],

      summary: [
        {
          label: "Total Drivers",
          value: rows.length,
        },
      ],
    });
  } catch (error) {
    errorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Export failed",
    );
  }
};

export const exportDriverSettlementPDF = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const rows = await getDriverSettlementData();
    const columns = getSelectedColumns(
      driverSettlementPdfColumns,
      req.body.columns,
    );

    exportPDF({
      res,

      title: "Driver Settlement Report",

      fileName: "driver-settlement",

      columns: columns,

      rows,

      filters: [],

      summary: [
        {
          label: "Total Drivers",
          value: rows.length,
        },
      ],
    });
  } catch (error) {
    errorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Export failed",
    );
  }
};

/**
 * Customer Ledger Data
 */
const getCustomerLedgerData = async (customerId: string) => {
  const customer = await Customer.findById(customerId).select("name").lean();

  if (!customer) {
    return null;
  }

  const [bookings, payments] = await Promise.all([
    Booking.find({ customerId })
      .select("bookingNumber bookingDate price")
      .sort({ bookingDate: 1 })
      .lean(),

    Payment.find({ customerId })
      .select("paymentNumber paymentDate totalAmount")
      .sort({ paymentDate: 1 })
      .lean(),
  ]);

  const ledger: {
    date: Date;
    type: "BOOKING" | "PAYMENT";
    reference: string;
    debit: number;
    credit: number;
    balance?: number;
  }[] = [];

  bookings.forEach((booking) => {
    ledger.push({
      date: booking.bookingDate,
      type: "BOOKING",
      reference: booking.bookingNumber,
      debit: booking.price,
      credit: 0,
    });
  });

  payments.forEach((payment) => {
    ledger.push({
      date: payment.paymentDate,
      type: "PAYMENT",
      reference: payment.paymentNumber,
      debit: 0,
      credit: payment.totalAmount,
    });
  });

  ledger.sort((a, b) => a.date.getTime() - b.date.getTime());

  let balance = 0;

  ledger.forEach((item) => {
    balance += item.debit;
    balance -= item.credit;

    item.balance = balance;
  });

  return {
    customer,

    summary: {
      totalBookings: bookings.length,

      totalBookedAmount: bookings.reduce((t, b) => t + b.price, 0),

      totalPayments: payments.reduce((t, p) => t + p.totalAmount, 0),

      outstanding: balance,
    },

    rows: ledger,
  };
};

export const getCustomerLedger = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { customerId } = req.params;

    const data = await getCustomerLedgerData(customerId.toString());

    if (!data) {
      errorResponse(res, 404, "Customer not found.");
      return;
    }

    successResponse(res, "Customer ledger fetched successfully.", data);
  } catch (error) {
    errorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
};

export const exportCustomerLedgerExcel = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { customerId } = req.params;

    const data = await getCustomerLedgerData(customerId.toString());
    const columns = getSelectedColumns(
      customerLedgerExcelColumns,
      req.body.columns,
    );

    if (!data) {
      errorResponse(res, 404, "Customer not found.");
      return;
    }

    await exportExcel({
      res,

      title: "Customer Ledger",

      fileName: "customer-ledger",

      columns: columns,

      rows: data.rows,

      filters: [],

      summary: [
        {
          label: "Total Bookings",
          value: data.summary.totalBookings,
        },
        {
          label: "Booked Amount",
          value: `₹${data.summary.totalBookedAmount}`,
        },
        {
          label: "Total Payments",
          value: `₹${data.summary.totalPayments}`,
        },
        {
          label: "Outstanding",
          value: `₹${data.summary.outstanding}`,
        },
      ],
    });
  } catch (error) {
    errorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Export failed",
    );
  }
};

export const exportCustomerLedgerPDF = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { customerId } = req.params;

    const data = await getCustomerLedgerData(customerId.toString());
    const columns = getSelectedColumns(
      customerLedgerPdfColumns,
      req.body.columns,
    );

    if (!data) {
      errorResponse(res, 404, "Customer not found.");
      return;
    }

    exportPDF({
      res,

      title: "Customer Ledger",

      fileName: "customer-ledger",

      columns: columns,

      rows: data.rows,

      filters: [],

      summary: [
        {
          label: "Total Bookings",
          value: data.summary.totalBookings,
        },
        {
          label: "Booked Amount",
          value: `₹${data.summary.totalBookedAmount}`,
        },
        {
          label: "Total Payments",
          value: `₹${data.summary.totalPayments}`,
        },
        {
          label: "Outstanding",
          value: `₹${data.summary.outstanding}`,
        },
      ],
    });
  } catch (error) {
    errorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Export failed",
    );
  }
};

/**
 * Daily Collection Report
 */
export const getDailyCollection = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await getDailyCollectionData(req);

    successResponse(res, "Daily collection fetched successfully.", data);
  } catch (error) {
    errorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
};

export const exportDailyCollectionExcel = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await getDailyCollectionData(req);
    const columns = getSelectedColumns(
      dailyCollectionExcelColumns,
      req.body.columns,
    );

    await exportExcel({
      res,

      title: "Daily Collection",

      fileName: "daily-collection",

      columns: columns,

      rows: data.rows,

      filters: [],

      summary: [
        {
          label: "Total Days",
          value: data.rows.length,
        },
      ],
    });
  } catch (error) {
    errorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Export failed",
    );
  }
};

export const exportDailyCollectionPDF = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await getDailyCollectionData(req);
    const columns = getSelectedColumns(
      dailyCollectionPdfColumns,
      req.body.columns,
    );

    exportPDF({
      res,

      title: "Daily Collection Report",

      fileName: "daily-collection",

      columns: columns,

      rows: data.rows,

      filters: [],

      summary: [
        {
          label: "Total Days",
          value: data.rows.length,
        },
      ],
    });
  } catch (error) {
    errorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Export failed",
    );
  }
};
