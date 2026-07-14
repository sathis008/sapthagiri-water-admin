import { Router } from "express";

import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  assignBooking,
  completeDelivery,
  getPendingBookingsByCustomer,
} from "../controller/booking.controller";

const router = Router();

/**
 * Create Booking
 */
router.post("/", createBooking);

/**
 * Get All Bookings
 */
router.get("/", getBookings);

/**
 * Get Pending Bookings By Customer
 */
router.get("/customer/:customerId/pending", getPendingBookingsByCustomer);

/**
 * Get Booking By Id
 */
router.get("/:id", getBookingById);

/**
 * Update Booking
 */
router.put("/:id", updateBooking);

/**
 * Delete Booking
 */
router.delete("/:id", deleteBooking);

/**
 * Assign Driver & Vehicle
 */
router.put("/:id/assign", assignBooking);

/**
 * Complete Delivery
 */
router.put("/:id/deliver", completeDelivery);

export default router;
