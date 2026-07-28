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
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.post("/", authenticate, createVehicle);
router.get("/", authenticate, getVehicles);
router.get("/options", authenticate, getVehicleOptions);
router.get("/:id", authenticate, getVehicleById);
router.put("/:id", authenticate, updateVehicle);

// Delete requires ADMIN role
router.delete("/:id", authenticate, authorize("ADMIN"), deleteVehicle);

router.post(
  "/:id/upload/:documentType",
  authenticate,
  uploadVehicleDocument.single("file"),
  uploadVehicleDocumentById,
);

export default router;
