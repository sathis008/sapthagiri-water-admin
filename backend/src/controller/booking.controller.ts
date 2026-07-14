import { Request, Response } from "express";

import Booking from "../models/booking.model";

import Customer from "../models/customer.model";

import Vehicle from "../models/vehicle.model";
import Driver from "../models/driver.models";
import { getPagination } from "../utils/pagination";
import { getSorting } from "../utils/queryBuilder";
import { buildSearchQuery } from "../utils/search";

import { successResponse, errorResponse } from "../utils/response";

export const createBooking = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      customerId,

      capacity,

      price,

      bookingDate,

      notes,
    } = req.body;

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
     * Booking Number
     */

    const totalBookings = await Booking.countDocuments();

    const bookingNumber = `BK${String(totalBookings + 1).padStart(6, "0")}`;

    /**
     * Create Booking
     */

    const booking = await Booking.create({
      bookingNumber,

      customerId,

      customerName: customer.name,

      phone: customer.phone,

      address: customer.address,

      capacity,

      price,

      bookingDate,

      notes,
    });

    res.status(201).json({
      success: true,

      message: "Booking created successfully.",

      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const getBookings = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const search = String(req.query.search || "");

    const status = String(req.query.status || "");

    const paymentStatus = String(req.query.paymentStatus || "");

    const bookingDate = String(req.query.bookingDate || "");

    const today = req.query.today === "true";

    const query: any = {
      isDeleted: false,

      ...buildSearchQuery(search, ["bookingNumber", "customerName", "phone"]),
    };

    /**
     * Status Filter
     */
    if (status) {
      query.status = status;
    }

    /**
     * Payment Status Filter
     */
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    /**
     * Booking Date Filter
     */
    if (bookingDate) {
      const startDate = new Date(bookingDate);

      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(bookingDate);

      endDate.setHours(23, 59, 59, 999);

      query.bookingDate = {
        $gte: startDate,

        $lte: endDate,
      };
    }

    /**
     * Today's Bookings
     */
    if (today) {
      const startDate = new Date();

      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date();

      endDate.setHours(23, 59, 59, 999);

      query.bookingDate = {
        $gte: startDate,

        $lte: endDate,
      };
    }

    const total = await Booking.countDocuments(query);
    const sort = getSorting(req);
    const bookings = await Booking.find(query)

      .sort(sort)

      .skip(skip)

      .limit(limit);

    successResponse(res, "Bookings fetched successfully.", bookings, {
      page,

      limit,

      total,

      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    errorResponse(res, 500, error.message);
  }
};

export const getBookingById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404).json({
        success: false,

        message: "Booking not found.",
      });

      return;
    }

    res.status(200).json({
      success: true,

      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

/**
 * Assign Booking
 */
export const assignBooking = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { vehicleId, driverId, notes } = req.body;

    /**
     * Booking
     */
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404).json({
        success: false,

        message: "Booking not found.",
      });

      return;
    }

    /**
     * Vehicle
     */
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      res.status(404).json({
        success: false,

        message: "Vehicle not found.",
      });

      return;
    }

    /**
     * Driver
     */
    const driver = await Driver.findById(driverId);

    if (!driver) {
      res.status(404).json({
        success: false,

        message: "Driver not found.",
      });

      return;
    }

    booking.vehicleId = vehicle._id;

    booking.vehicleNumber = vehicle.vehicleNumber;

    booking.driverId = driver._id;

    booking.driverName = driver.name;

    booking.notes = notes;

    booking.status = "ASSIGNED";

    await booking.save();

    res.status(200).json({
      success: true,

      message: "Booking assigned successfully.",

      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

/**
 * Complete Delivery
 */
export const completeDelivery = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { collectionMethod, notes } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Booking not found.",
      });

      return;
    }

    booking.collectionMethod = collectionMethod;

    booking.notes = notes;

    booking.status = "DELIVERED";

    if (collectionMethod === "ACCOUNT_COLLECTION") {
      booking.paymentStatus = "PAID";
    } else {
      booking.paymentStatus = "PENDING";
    }

    await booking.save();

    res.status(200).json({
      success: true,

      message: "Delivery completed successfully.",

      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,

      message: error.message || "Failed to complete delivery.",
    });
  }
};

export const updateBooking = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
      return;
    }

    const previousStatus = booking.status;
    const newStatus = req.body.status ?? booking.status;

    /**
     * Validation
     */
    if (
      (newStatus === "ASSIGNED" || newStatus === "DELIVERED") &&
      (!req.body.driverId || !req.body.vehicleId)
    ) {
      res.status(400).json({
        success: false,
        message: "Driver and Vehicle are required.",
      });
      return;
    }

    if (newStatus === "DELIVERED" && !req.body.collectionMethod) {
      res.status(400).json({
        success: false,
        message: "Collection Method is required.",
      });
      return;
    }

    /**
     * Customer Changed
     */
    if (
      req.body.customerId &&
      req.body.customerId.toString() !== booking.customerId.toString()
    ) {
      const customer = await Customer.findById(req.body.customerId);

      if (!customer) {
        res.status(404).json({
          success: false,
          message: "Customer not found.",
        });
        return;
      }

      booking.customerId = customer._id;

      booking.customerName = customer.name;

      booking.phone = customer.phone;

      booking.address = customer.address;
    }

    /**
     * Booking Details
     */
    booking.capacity = req.body.capacity ?? booking.capacity;

    booking.price = req.body.price ?? booking.price;

    booking.bookingDate = req.body.bookingDate ?? booking.bookingDate;

    booking.notes = req.body.notes ?? booking.notes;

    /**
     * Driver & Vehicle
     */
    if (newStatus === "ASSIGNED" || newStatus === "DELIVERED") {
      const driver = await Driver.findById(req.body.driverId);

      const vehicle = await Vehicle.findById(req.body.vehicleId);

      if (!driver || !vehicle) {
        res.status(404).json({
          success: false,
          message: "Driver or Vehicle not found.",
        });
        return;
      }

      booking.driverId = driver._id;

      booking.driverName = driver.name;

      booking.vehicleId = vehicle._id;

      booking.vehicleNumber = vehicle.vehicleNumber;
    }

    /**
     * Delivery
     */
    if (newStatus === "DELIVERED") {
      booking.collectionMethod = req.body.collectionMethod;
    }

    /**
     * Rollback
     */
    switch (`${previousStatus}->${newStatus}`) {
      /**
       * ASSIGNED → CONFIRMED
       */
      case "ASSIGNED->CONFIRMED":
        booking.driverId = undefined;
        booking.driverName = undefined;

        booking.vehicleId = undefined;
        booking.vehicleNumber = undefined;

        break;

      /**
       * DELIVERED → ASSIGNED
       */
      case "DELIVERED->ASSIGNED":
        booking.collectionMethod = undefined;

        booking.paymentStatus = "PENDING";

        break;

      /**
       * DELIVERED → CONFIRMED
       */
      case "DELIVERED->CONFIRMED":
        booking.driverId = undefined;
        booking.driverName = undefined;

        booking.vehicleId = undefined;
        booking.vehicleNumber = undefined;

        booking.collectionMethod = undefined;

        booking.paymentStatus = "PENDING";

        break;

      default:
        break;
    }

    /**
     * Status
     */
    booking.status = newStatus;

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking updated successfully.",
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBooking = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Booking not found.",
      });

      return;
    }

    booking.isDeleted = true;
    booking.deletedAt = new Date();

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPendingBookingsByCustomer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { customerId } = req.params;

    const bookings = await Booking.find({
      customerId,
      status: "DELIVERED",
      paymentStatus: "PENDING",
      isDeleted: false,
    })
      .sort({
        bookingDate: 1,
      })
      .select(
        "_id bookingNumber bookingDate capacity price collectionMethod driverId driverName vehicleId vehicleNumber",
      );

    successResponse(res, "Pending bookings fetched successfully.", bookings);
  } catch (error: any) {
    errorResponse(res, 500, error.message);
  }
};
