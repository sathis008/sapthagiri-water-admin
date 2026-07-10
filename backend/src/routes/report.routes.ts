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

const router = Router();

/**
 * Booking Report
 */
router.get("/bookings", getBookingReport);
router.post("/bookings/export/excel", exportBookingExcel);
router.post("/bookings/export/pdf", exportBookingPDF);

/**
 * Payment Report
 */
router.get("/payments", getPaymentReport);
router.post("/payments/export/excel", exportPaymentExcel);
router.post("/payments/export/pdf", exportPaymentPDF);

/**
 * Customer Ledger
 */
router.get("/customer-ledger/:customerId", getCustomerLedger);
router.post(
  "/customer-ledger/:customerId/export/excel",
  exportCustomerLedgerExcel,
);
router.post("/customer-ledger/:customerId/export/pdf", exportCustomerLedgerPDF);

/**
 * Driver Settlement
 */
router.get("/driver-settlement", getDriverSettlement);
router.post("/driver-settlement/export/excel", exportDriverSettlementExcel);
router.post("/driver-settlement/export/pdf", exportDriverSettlementPDF);

/**
 * Daily Collection
 */
router.get("/daily-collection", getDailyCollection);
router.post("/daily-collection/export/excel", exportDailyCollectionExcel);
router.post("/daily-collection/export/pdf", exportDailyCollectionPDF);

export default router;
