import { Request, Response } from 'express';

import Booking from '../models/booking.model';

import Customer from '../models/customer.model';

import Vehicle from '../models/vehicle.model';
import Driver from '../models/driver.models';

export const createBooking = async (req: Request, res: Response): Promise<void> => {
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

        message: 'Customer not found.',
      });

      return;
    }

    /**
     * Booking Number
     */

    const totalBookings = await Booking.countDocuments();

    const bookingNumber = `BK${String(totalBookings + 1).padStart(6, '0')}`;

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

      message: 'Booking created successfully.',

      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const getBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find()

      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,

      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const getBookingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404).json({
        success: false,

        message: 'Booking not found.',
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
export const assignBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { vehicleId, driverId, notes } = req.body;

    /**
     * Booking
     */
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404).json({
        success: false,

        message: 'Booking not found.',
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

        message: 'Vehicle not found.',
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

        message: 'Driver not found.',
      });

      return;
    }

    booking.vehicleId = vehicle._id;

    booking.vehicleNumber = vehicle.vehicleNumber;

    booking.driverId = driver._id;

    booking.driverName = driver.name;

    booking.notes = notes;

    booking.status = 'ASSIGNED';

    await booking.save();

    res.status(200).json({
      success: true,

      message: 'Booking assigned successfully.',

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
export const completeDelivery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { collectionMethod, notes } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found.',
      });

      return;
    }

    booking.collectionMethod = collectionMethod;

    booking.notes = notes;

    booking.status = 'DELIVERED';

    if (collectionMethod === 'ACCOUNT_COLLECTION') {
      booking.paymentStatus = 'PAID';
    } else {
      booking.paymentStatus = 'PENDING';
    }

    await booking.save();

    res.status(200).json({
      success: true,

      message: 'Delivery completed successfully.',

      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,

      message: error.message || 'Failed to complete delivery.',
    });
  }
};
