import { Router } from "express";
import { createExpense, deleteExpense, getExpenseById, getExpenses, updateExpense } from "../controller/expense.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();
router.get("/", authenticate, getExpenses);
router.get("/:id", authenticate, getExpenseById);
router.post("/", authenticate, authorize("ADMIN", "MANAGER"), createExpense);
router.put("/:id", authenticate, authorize("ADMIN", "MANAGER"), updateExpense);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteExpense);
export default router;
