import { Router } from "express";

import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  uploadVehicleDocumentById,
  getVehicleOptions,
} from "../controller/vehicle.controller";

import { uploadVehicleDocument } from "../middleware/upload.middleware";

const router = Router();

/**
 * Create Vehicle
 */
router.post("/", createVehicle);

/**
 * Get All Vehicles
 */
router.get("/", getVehicles);

/**
 * Get Vehicle By Id
 */
router.get("/:id", getVehicleById);

/**
 * Update Vehicle
 */
router.put("/:id", updateVehicle);

/**
 * Delete Vehicle
 */
router.delete("/:id", deleteVehicle);

/**
 * Upload Vehicle Document
 */
router.post(
  "/:id/upload/:documentType",
  uploadVehicleDocument.single("file"),
  uploadVehicleDocumentById,
);

router.get("/options", getVehicleOptions);

export default router;
