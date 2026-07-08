import { Router } from "express";

import {
  createPayment,
  getPayments,
  getPaymentById,
  deletePayment,
} from "../controller/payment.controller";

const router = Router();

router.post("/", createPayment);

router.get("/", getPayments);

router.get("/:id", getPaymentById);

router.delete("/:id", deletePayment);

export default router;
