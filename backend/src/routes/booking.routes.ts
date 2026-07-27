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

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

// All booking routes require authentication
router.post("/", authenticate, createBooking);
router.get("/", authenticate, getBookings);
router.get(
  "/customer/:customerId/pending",
  authenticate,
  getPendingBookingsByCustomer,
);
router.get("/:id", authenticate, getBookingById);
router.put("/:id", authenticate, updateBooking);
router.put("/:id/assign", authenticate, assignBooking);
router.put("/:id/deliver", authenticate, completeDelivery);

// Delete requires ADMIN role
router.delete("/:id", authenticate, authorize("ADMIN"), deleteBooking);

export default router;
