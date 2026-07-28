import { Router } from "express";

import {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
  uploadDriverLicense,
  getDriverOptions,
} from "../controller/driver.controller";

import { uploadDriverDocument } from "../middleware/upload.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.post("/", authenticate, createDriver);
router.get("/", authenticate, getDrivers);
router.get("/options", authenticate, getDriverOptions);
router.get("/:id", authenticate, getDriverById);
router.put("/:id", authenticate, updateDriver);

// Delete requires ADMIN role
router.delete("/:id", authenticate, authorize("ADMIN"), deleteDriver);

router.post(
  "/:id/upload",
  authenticate,
  uploadDriverDocument.single("file"),
  uploadDriverLicense,
);

export default router;
