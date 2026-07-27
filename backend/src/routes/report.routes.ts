import { Router } from "express";

import {
  getBookingReport,
  exportBookingExcel,
  exportBookingPDF,
  getPaymentReport,
  exportPaymentExcel,
  exportPaymentPDF,
  getCustomerLedger,
  exportCustomerLedgerExcel,
  exportCustomerLedgerPDF,
  getDriverSettlement,
  exportDriverSettlementExcel,
  exportDriverSettlementPDF,
  getDailyCollection,
  exportDailyCollectionExcel,
  exportDailyCollectionPDF,
} from "../controller/report.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

// All report routes require authentication (applied globally)
router.use(authenticate);

/**
 * Booking Report — both Admin and Manager
 */
router.get("/bookings", getBookingReport);
router.post("/bookings/export/excel", exportBookingExcel);
router.post("/bookings/export/pdf", exportBookingPDF);

/**
 * Payment Report — Admin only (contains full financial data)
 */
router.get("/payments", authorize("ADMIN"), getPaymentReport);
router.post("/payments/export/excel", authorize("ADMIN"), exportPaymentExcel);
router.post("/payments/export/pdf", authorize("ADMIN"), exportPaymentPDF);

/**
 * Customer Ledger — both Admin and Manager
 */
router.get("/customer-ledger/:customerId", getCustomerLedger);
router.post(
  "/customer-ledger/:customerId/export/excel",
  exportCustomerLedgerExcel,
);
router.post("/customer-ledger/:customerId/export/pdf", exportCustomerLedgerPDF);

/**
 * Driver Settlement — both Admin and Manager
 */
router.get("/driver-settlement", getDriverSettlement);
router.post("/driver-settlement/export/excel", exportDriverSettlementExcel);
router.post("/driver-settlement/export/pdf", exportDriverSettlementPDF);

/**
 * Daily Collection — both Admin and Manager
 */
router.get("/daily-collection", getDailyCollection);
router.post("/daily-collection/export/excel", exportDailyCollectionExcel);
router.post("/daily-collection/export/pdf", exportDailyCollectionPDF);

export default router;
