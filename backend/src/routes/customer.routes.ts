import { Router } from "express";

import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerOptions,
} from "../controller/customer.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

// All customer routes require authentication
router.get("/", authenticate, getCustomers);
router.get("/options", authenticate, getCustomerOptions);
router.get("/:id", authenticate, getCustomerById);
router.post("/", authenticate, createCustomer);
router.put("/:id", authenticate, updateCustomer);

// Delete requires ADMIN role
router.delete("/:id", authenticate, authorize("ADMIN"), deleteCustomer);

export default router;
