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
const router = Router();

/**
 * Customer Routes
 */

// Get All Customers
router.get("/", authenticate, getCustomers);

// Get Customer By Id
router.get("/:id", authenticate, getCustomerById);

// Create Customer
router.post("/", authenticate, createCustomer);

// Update Customer
router.put("/:id", authenticate, updateCustomer);

// Delete Customer
router.delete("/:id", authenticate, deleteCustomer);

router.get("/options", getCustomerOptions);

export default router;
