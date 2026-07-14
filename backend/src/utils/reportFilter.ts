import { FilterQuery } from "mongoose";

import Booking from "../models/booking.model";
import Payment from "../models/payment.model";

interface BookingFilterParams {
  search?: string;
  customerId?: string;
  driverId?: string;
  vehicleId?: string;
  status?: string;
  paymentStatus?: string;
  fromDate?: string;
  toDate?: string;
}

export const buildBookingFilter = (
  params: BookingFilterParams,
): FilterQuery<typeof Booking> => {
  const {
    search,
    customerId,
    driverId,
    vehicleId,
    status,
    paymentStatus,
    fromDate,
    toDate,
  } = params;

  const filter: Record<string, any> = {};

  /**
   * Search
   */
  if (search) {
    filter.$or = [
      {
        bookingNumber: {
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
      {
        phone: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  /**
   * Customer
   */
  if (customerId) {
    filter.customerId = customerId;
  }

  /**
   * Driver
   */
  if (driverId) {
    filter.driverId = driverId;
  }

  /**
   * Vehicle
   */
  if (vehicleId) {
    filter.vehicleId = vehicleId;
  }

  /**
   * Status
   */
  if (status) {
    filter.status = status;
  }

  /**
   * Payment Status
   */
  if (paymentStatus) {
    filter.paymentStatus = paymentStatus;
  }

  /**
   * Date
   */
  if (fromDate || toDate) {
    filter.bookingDate = {};

    if (fromDate) {
      filter.bookingDate.$gte = new Date(fromDate);
    }

    if (toDate) {
      const end = new Date(toDate);

      end.setHours(23, 59, 59, 999);

      filter.bookingDate.$lte = end;
    }
  }

  return filter;
};

interface PaymentFilterParams {
  search?: string;
  customerId?: string;
  driverId?: string;
  collectedBy?: string;
  paymentMode?: string;
  fromDate?: string;
  toDate?: string;
}

export const buildPaymentFilter = (
  params: PaymentFilterParams,
): FilterQuery<typeof Payment> => {
  const {
    search,
    customerId,
    driverId,
    collectedBy,
    paymentMode,
    fromDate,
    toDate,
  } = params;

  const filter: Record<string, any> = {};

  if (search) {
    filter.$or = [
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

  if (customerId) {
    filter.customerId = customerId;
  }

  if (driverId) {
    filter.driverId = driverId;
  }

  if (paymentMode) {
    filter.paymentMode = paymentMode;
  }

  if (collectedBy) {
    filter.collectedBy = collectedBy;
  }

  if (fromDate || toDate) {
    filter.paymentDate = {};

    if (fromDate) {
      filter.paymentDate.$gte = new Date(fromDate);
    }

    if (toDate) {
      const end = new Date(toDate);

      end.setHours(23, 59, 59, 999);

      filter.paymentDate.$lte = end;
    }
  }

  return filter;
};
