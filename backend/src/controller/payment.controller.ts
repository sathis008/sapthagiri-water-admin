import { Request, Response } from "express";

import Booking from "../models/booking.model";
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
    const bookingFilter: Record<string, unknown> = {
      _id: { $in: bookingIds },
      paymentStatus: "PENDING",
    };

    if (customerId) bookingFilter.customerId = customerId;

    const bookings = await Booking.find(bookingFilter);

    if (!bookings.length) {
      res.status(400).json({
        success: false,
        message: "No pending bookings found.",
      });

      return;
    }

    // A driver can collect payments for several customers. Each customer gets
    // their own payment record, while all selected bookings are processed once.
    const bookingsByCustomer = new Map<string, typeof bookings>();
    for (const booking of bookings) {
      const key = booking.customerId.toString();
      bookingsByCustomer.set(key, [...(bookingsByCustomer.get(key) ?? []), booking]);
    }

    const payments = [];
    for (const [selectedCustomerId, customerBookings] of bookingsByCustomer) {
      const payment = await Payment.create({
        paymentNumber: await generatePaymentNumber(),
        customerId: selectedCustomerId,
        customerName: customerBookings[0].customerName,
        totalAmount: customerBookings.reduce((sum, booking) => sum + booking.price, 0),
        paymentMode,
        collectedBy,
        driverId: driver?._id,
        driverName: driver?.name,
        paymentDate: new Date(),
        notes,
      });

      await PaymentItem.insertMany(
        customerBookings.map((booking) => ({
          paymentId: payment._id,
          bookingId: booking._id,
          bookingNumber: booking.bookingNumber,
          amount: booking.price,
        })),
      );

      await Booking.updateMany(
        { _id: { $in: customerBookings.map((booking) => booking._id) } },
        { paymentStatus: "PAID", paymentId: payment._id },
      );

      payments.push(payment);
    }

    res.status(201).json({
      success: true,

      message: "Payment received successfully.",

      data: payments,
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
    const { page, limit, skip } = getPagination(req.query);

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
