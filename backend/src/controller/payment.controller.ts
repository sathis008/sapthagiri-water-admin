import { Request, Response } from "express";

import Booking from "../models/booking.model";
import Customer from "../models/customer.model";
import Driver from "../models/driver.models";
import PaymentItem from "../models/paymentItem.model";
import Payment from "../models/payment.model";
import { generatePaymentNumber } from "../utils/paymentNumber";
import { getPagination } from "../utils/pagination";
import { errorResponse, successResponse } from "../utils/response";

export const createPayment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      customerId,
      bookingIds,
      paymentMode,
      collectedBy,
      driverId,
      notes,
    } = req.body;

    if (!bookingIds?.length) {
      res.status(400).json({
        success: false,
        message: "Please select bookings.",
      });

      return;
    }

    /**
     * Customer
     */
    const customer = await Customer.findById(customerId);

    if (!customer) {
      res.status(404).json({
        success: false,
        message: "Customer not found.",
      });

      return;
    }

    /**
     * Driver
     */
    let driver = null;

    if (collectedBy === "DRIVER") {
      driver = await Driver.findById(driverId);

      if (!driver) {
        res.status(404).json({
          success: false,
          message: "Driver not found.",
        });

        return;
      }
    }

    /**
     * Get Pending Bookings
     */
    const bookings = await Booking.find({
      _id: { $in: bookingIds },

      customerId,

      paymentStatus: "PENDING",
    });

    if (!bookings.length) {
      res.status(400).json({
        success: false,
        message: "No pending bookings found.",
      });

      return;
    }

    /**
     * Calculate Total
     */
    const totalAmount = bookings.reduce(
      (sum, booking) => sum + booking.price,
      0,
    );

    /**
     * Create Payment
     */
    const payment = await Payment.create({
      paymentNumber: await generatePaymentNumber(),

      customerId,

      customerName: customer.name,

      totalAmount,

      paymentMode,

      collectedBy,

      driverId: driver?._id,

      driverName: driver?.name,

      paymentDate: new Date(),

      notes,
    });

    /**
     * Create Payment Items
     */
    const paymentItems = bookings.map((booking) => ({
      paymentId: payment._id,

      bookingId: booking._id,

      bookingNumber: booking.bookingNumber,

      amount: booking.price,
    }));

    await PaymentItem.insertMany(paymentItems);

    /**
     * Update Bookings
     */
    await Booking.updateMany(
      {
        _id: {
          $in: bookingIds,
        },
      },
      {
        paymentStatus: "PAID",

        paymentId: payment._id,
      },
    );

    res.status(201).json({
      success: true,

      message: "Payment received successfully.",

      data: payment,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
export const getPayments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { page, limit, skip } = getPagination(req);

    const search = String(req.query.search || "");

    const collectedBy = String(req.query.collectedBy || "");

    const paymentMode = String(req.query.paymentMode || "");

    const query: any = {};

    if (search) {
      query.$or = [
        {
          paymentNumber: {
            $regex: search,
            $options: "i",
          },
        },
        {
          customerName: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (collectedBy) {
      query.collectedBy = collectedBy;
    }

    if (paymentMode) {
      query.paymentMode = paymentMode;
    }

    const total = await Payment.countDocuments(query);

    const payments = await Payment.find(query)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    successResponse(res, "Payments fetched successfully.", payments, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    errorResponse(res, 500, error.message);
  }
};

export const getPaymentById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      errorResponse(res, 404, "Payment not found.");
      return;
    }

    const items = await PaymentItem.find({
      paymentId: payment._id,
    }).populate({
      path: "bookingId",
      select: "bookingNumber bookingDate capacity",
    });

    const paymentItems = items.map((item: any) => ({
      _id: item._id,
      bookingId: item.bookingId._id,
      bookingNumber: item.bookingId.bookingNumber,
      bookingDate: item.bookingId.bookingDate,
      capacity: item.bookingId.capacity,
      amount: item.amount,
    }));

    successResponse(res, "Payment fetched successfully.", {
      payment,
      items: paymentItems,
    });
  } catch (error: any) {
    errorResponse(res, 500, error.message);
  }
};

export const deletePayment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      errorResponse(res, 404, "Payment not found.");
      return;
    }

    const items = await PaymentItem.find({
      paymentId: payment._id,
    });

    const bookingIds = items.map((item) => item.bookingId);

    await Booking.updateMany(
      {
        _id: {
          $in: bookingIds,
        },
      },
      {
        paymentStatus: "PENDING",

        paymentId: null,
      },
    );

    await PaymentItem.deleteMany({
      paymentId: payment._id,
    });

    await payment.deleteOne();

    successResponse(res, "Payment deleted successfully.", null);
  } catch (error: any) {
    errorResponse(res, 500, error.message);
  }
};
