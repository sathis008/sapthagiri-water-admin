import { Request, Response } from "express";

import Booking from "../models/booking.model";
import Customer from "../models/customer.model";
import Vehicle from "../models/vehicle.model";
import Payment from "../models/payment.model";
import Driver from "../models/driver.models";

import { successResponse, errorResponse } from "../utils/response";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type BookingStatusKey = "CONFIRMED" | "ASSIGNED" | "DELIVERED" | "CANCELLED";
type PaymentModeKey = "CASH" | "UPI" | "BANK";
type ActivityType = "BOOKING" | "ASSIGNED" | "DELIVERED" | "PAYMENT";

interface BookingStatusCount {
  CONFIRMED: number;
  ASSIGNED: number;
  DELIVERED: number;
  CANCELLED: number;
}

interface PaymentModeStat {
  count: number;
  amount: number;
}

interface PaymentModeDistribution {
  CASH: PaymentModeStat;
  UPI: PaymentModeStat;
  BANK: PaymentModeStat;
}

interface WeeklyTrendPoint {
  date: string;
  bookings: number;
  deliveries: number;
}

interface DayRange {
  start: Date;
  end: Date;
  label: string;
}

interface Activity {
  time: Date;
  type: ActivityType;
  title: string;
  subtitle: string;
}

interface SumResult {
  total: number;
}

interface BookingStatusAggResult {
  _id: BookingStatusKey;
  count: number;
}

interface PaymentModeAggResult {
  _id: PaymentModeKey;
  count: number;
  amount: number;
}

interface WeeklyTrendRawDoc {
  bookingDate?: Date;
  updatedAt?: Date;
  status?: string;
}

interface RecentBooking {
  bookingNumber: string;
  customerName: string;
  status: string;
  bookingDate: Date;
  price: number;
  paymentStatus: string;
}

interface RecentPayment {
  paymentNumber: string;
  customerName: string;
  totalAmount: number;
  paymentMode: string;
  collectedBy: string;
  paymentDate: Date;
}

interface TopCustomerResult {
  _id: string;
  customerName: string;
  totalBookings: number;
  totalAmount: number;
}

interface TopDriverResult {
  _id: string;
  driverName: string;
  deliveries: number;
}

interface TopVehicleResult {
  _id: string;
  vehicleNumber: string;
  deliveries: number;
}

interface LeanBookingActivity {
  bookingNumber: string;
  customerName: string;
  createdAt: Date;
}

interface LeanAssignedActivity {
  bookingNumber: string;
  driverName: string;
  updatedAt: Date;
}

interface LeanDeliveredActivity {
  bookingNumber: string;
  updatedAt: Date;
}

interface LeanPaymentActivity {
  paymentNumber: string;
  totalAmount: number;
  paymentDate: Date;
}

/* ------------------------------------------------------------------ */
/* Controller                                                          */
/* ------------------------------------------------------------------ */

export const getDashboard = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    /* -------------------------------------------------------------- */
    /* Date Variables                                                  */
    /* -------------------------------------------------------------- */

    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    // Pre-compute the 7 day boundaries (oldest -> newest) used for the
    // weekly booking trend. Kept identical to the original per-day
    // start/end logic so bucketing behaves exactly the same.
    const weekDayRanges: DayRange[] = [];

    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date();
      dayStart.setDate(dayStart.getDate() - i);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      weekDayRanges.push({
        start: dayStart,
        end: dayEnd,
        label: dayStart.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
      });
    }

    const weekRangeStart = weekDayRanges[0].start;
    const weekRangeEnd = weekDayRanges[weekDayRanges.length - 1].end;

    /* -------------------------------------------------------------- */
    /* Parallel Queries                                                */
    /* All independent reads are fired together instead of being       */
    /* awaited one by one, drastically cutting total round trips.      */
    /* -------------------------------------------------------------- */

    const [
      todayBookings,
      todayDeliveries,
      pendingCollectionsAgg,
      todayRevenueAgg,
      bookingStatusAggregation,
      paymentModeAggregation,
      weeklyTrendRaw,
      recentBookings,
      recentPayments,
      totalCustomers,
      totalDrivers,
      totalVehicles,
      topCustomerAgg,
      topDriverAgg,
      topVehicleAgg,
      todayBookingActivities,
      assignedActivities,
      deliveredActivities,
      paymentActivities,
    ] = await Promise.all([
      // Today's Bookings
      Booking.countDocuments({
        bookingDate: { $gte: startOfDay, $lte: endOfDay },
      }),

      // Today's Deliveries
      Booking.countDocuments({
        status: "DELIVERED",
        updatedAt: { $gte: startOfDay, $lte: endOfDay },
      }),

      // Pending Collections (summed in Mongo instead of find() + reduce())
      Booking.aggregate<SumResult>([
        { $match: { status: "DELIVERED", paymentStatus: "PENDING" } },
        { $group: { _id: null, total: { $sum: "$price" } } },
      ]),

      // Today's Revenue (summed in Mongo instead of find() + reduce())
      Payment.aggregate<SumResult>([
        { $match: { paymentDate: { $gte: startOfDay, $lte: endOfDay } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),

      // Booking Status Distribution
      Booking.aggregate<BookingStatusAggResult>([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),

      // Payment Mode Distribution
      Payment.aggregate<PaymentModeAggResult>([
        {
          $group: {
            _id: "$paymentMode",
            count: { $sum: 1 },
            amount: { $sum: "$totalAmount" },
          },
        },
      ]),

      // Weekly Booking Trend - single query for the whole 7-day window,
      // bucketed in memory (replaces 14 countDocuments() calls in a loop).
      Booking.aggregate<WeeklyTrendRawDoc>([
        {
          $match: {
            $or: [
              { bookingDate: { $gte: weekRangeStart, $lte: weekRangeEnd } },
              {
                status: "DELIVERED",
                updatedAt: { $gte: weekRangeStart, $lte: weekRangeEnd },
              },
            ],
          },
        },
        { $project: { _id: 0, bookingDate: 1, updatedAt: 1, status: 1 } },
      ]),

      // Recent Bookings
      Booking.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select(
          "bookingNumber customerName status bookingDate price paymentStatus",
        )
        .lean<RecentBooking[]>(),

      // Recent Payments
      Payment.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select(
          "paymentNumber customerName totalAmount paymentMode collectedBy paymentDate",
        )
        .lean<RecentPayment[]>(),

      // Counts
      Customer.countDocuments(),
      Driver.countDocuments(),
      Vehicle.countDocuments(),

      // Top Customer
      Booking.aggregate<TopCustomerResult>([
        {
          $group: {
            _id: "$customerId",
            customerName: { $first: "$customerName" },
            totalBookings: { $sum: 1 },
            totalAmount: { $sum: "$price" },
          },
        },
        { $sort: { totalAmount: -1 } },
        { $limit: 1 },
      ]),

      // Top Driver
      Booking.aggregate<TopDriverResult>([
        { $match: { driverId: { $ne: null } } },
        {
          $group: {
            _id: "$driverId",
            driverName: { $first: "$driverName" },
            deliveries: { $sum: 1 },
          },
        },
        { $sort: { deliveries: -1 } },
        { $limit: 1 },
      ]),

      // Top Vehicle
      Booking.aggregate<TopVehicleResult>([
        { $match: { vehicleId: { $ne: null } } },
        {
          $group: {
            _id: "$vehicleId",
            vehicleNumber: { $first: "$vehicleNumber" },
            deliveries: { $sum: 1 },
          },
        },
        { $sort: { deliveries: -1 } },
        { $limit: 1 },
      ]),

      // Today's Activities - Bookings created today
      Booking.find({ createdAt: { $gte: startOfDay, $lte: endOfDay } })
        .select("bookingNumber customerName createdAt")
        .sort({ createdAt: -1 })
        .lean<LeanBookingActivity[]>(),

      // Today's Activities - Drivers assigned today
      Booking.find({
        status: "ASSIGNED",
        updatedAt: { $gte: startOfDay, $lte: endOfDay },
      })
        .select("bookingNumber driverName updatedAt")
        .lean<LeanAssignedActivity[]>(),

      // Today's Activities - Deliveries completed today
      Booking.find({
        status: "DELIVERED",
        updatedAt: { $gte: startOfDay, $lte: endOfDay },
      })
        .select("bookingNumber updatedAt")
        .lean<LeanDeliveredActivity[]>(),

      // Today's Activities - Payments collected today
      Payment.find({ paymentDate: { $gte: startOfDay, $lte: endOfDay } })
        .select("paymentNumber totalAmount paymentDate")
        .lean<LeanPaymentActivity[]>(),
    ]);

    /* -------------------------------------------------------------- */
    /* Summary Calculations                                            */
    /* -------------------------------------------------------------- */

    const pendingCollections = pendingCollectionsAgg[0]?.total ?? 0;
    const todayRevenue = todayRevenueAgg[0]?.total ?? 0;

    const summary = {
      todayBookings,
      todayDeliveries,
      pendingCollections,
      todayRevenue,
      totalCustomers,
      totalDrivers,
      totalVehicles,
    };

    /* -------------------------------------------------------------- */
    /* Booking Status                                                  */
    /* -------------------------------------------------------------- */

    const bookingStatus: BookingStatusCount = {
      CONFIRMED: 0,
      ASSIGNED: 0,
      DELIVERED: 0,
      CANCELLED: 0,
    };

    bookingStatusAggregation.forEach((item) => {
      bookingStatus[item._id] = item.count;
    });

    /* -------------------------------------------------------------- */
    /* Payment Mode                                                    */
    /* -------------------------------------------------------------- */

    const paymentMode: PaymentModeDistribution = {
      CASH: { count: 0, amount: 0 },
      UPI: { count: 0, amount: 0 },
      BANK: { count: 0, amount: 0 },
    };

    paymentModeAggregation.forEach((item) => {
      paymentMode[item._id] = {
        count: item.count,
        amount: item.amount,
      };
    });

    /* -------------------------------------------------------------- */
    /* Weekly Trend                                                    */
    /* -------------------------------------------------------------- */

    const bookingTrend: WeeklyTrendPoint[] = weekDayRanges.map((range) => ({
      date: range.label,
      bookings: 0,
      deliveries: 0,
    }));

    const findDayIndex = (date: Date): number =>
      weekDayRanges.findIndex(
        (range) => date >= range.start && date <= range.end,
      );

    weeklyTrendRaw.forEach((doc) => {
      if (doc.bookingDate) {
        const idx = findDayIndex(new Date(doc.bookingDate));
        if (idx !== -1) bookingTrend[idx].bookings += 1;
      }

      if (doc.status === "DELIVERED" && doc.updatedAt) {
        const idx = findDayIndex(new Date(doc.updatedAt));
        if (idx !== -1) bookingTrend[idx].deliveries += 1;
      }
    });

    /* -------------------------------------------------------------- */
    /* Top Performers                                                  */
    /* -------------------------------------------------------------- */

    const topCustomer = topCustomerAgg[0] ?? null;
    const topDriver = topDriverAgg[0] ?? null;
    const topVehicle = topVehicleAgg[0] ?? null;

    /* -------------------------------------------------------------- */
    /* Activities                                                      */
    /* -------------------------------------------------------------- */

    const activities: Activity[] = [];

    todayBookingActivities.forEach((booking) => {
      activities.push({
        time: booking.createdAt,
        type: "BOOKING",
        title: `Booking ${booking.bookingNumber} created`,
        subtitle: booking.customerName,
      });
    });

    assignedActivities.forEach((booking) => {
      activities.push({
        time: booking.updatedAt,
        type: "ASSIGNED",
        title: "Driver Assigned",
        subtitle: `${booking.driverName} • ${booking.bookingNumber}`,
      });
    });

    deliveredActivities.forEach((booking) => {
      activities.push({
        time: booking.updatedAt,
        type: "DELIVERED",
        title: "Delivery Completed",
        subtitle: booking.bookingNumber,
      });
    });

    paymentActivities.forEach((payment) => {
      activities.push({
        time: payment.paymentDate,
        type: "PAYMENT",
        title: `Payment ${payment.paymentNumber}`,
        subtitle: `₹${payment.totalAmount}`,
      });
    });

    activities.sort((a, b) => b.time.getTime() - a.time.getTime());

    /* -------------------------------------------------------------- */
    /* Response                                                        */
    /* -------------------------------------------------------------- */

    successResponse(res, "Dashboard fetched successfully.", {
      summary,
      bookingStatus,
      paymentMode,
      bookingTrend,
      recentBookings,
      recentPayments,
      topCustomer,
      topDriver,
      topVehicle,
      activities,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong.";
    errorResponse(res, 500, message);
  }
};
