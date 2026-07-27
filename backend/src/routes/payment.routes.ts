import { Router } from "express";

import {
  createPayment,
  getPayments,
  getPaymentById,
  deletePayment,
} from "../controller/payment.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// All payment routes require authentication — both Admin and Manager can access
router.use(authenticate);

router.post("/", createPayment);

router.get("/", getPayments);

router.get("/:id", getPaymentById);

router.delete("/:id", deletePayment);

export default router;
