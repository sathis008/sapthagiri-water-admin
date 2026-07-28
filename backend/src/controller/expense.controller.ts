import { Request, Response } from "express";
import Expense from "../models/expense.model";
import { AuthRequest } from "../middleware/auth.middleware";

const numberFields = ["amount", "spareAmount", "labourAmount", "diesel", "dieselAmount", "mileage", "count"];
const nullableFields = ["vehicleId", "driverId", "employeeName", "vendor", "notes", "amount", "spareAmount", "labourAmount", "diesel", "dieselAmount", "mileage", "count", "month", "expiryDate"];

const normalizePayload = (body: Record<string, unknown>) => {
  const payload: Record<string, unknown> = { ...body };
  nullableFields.forEach((field) => {
    if (payload[field] === "" || payload[field] === undefined) payload[field] = null;
  });
  numberFields.forEach((field) => {
    if (payload[field] !== null) payload[field] = Number(payload[field]);
  });
  if (payload.expenseSubCategory === "Vehicle Maintenance") {
    payload.amount = Number(payload.spareAmount || 0) + Number(payload.labourAmount || 0);
  }
  return payload;
};

const validationError = async (payload: Record<string, unknown>) => {
  if (!payload.expenseCategory || !payload.expenseSubCategory || !payload.expenseDate) return "Expense category, sub category and date are required.";
  const vehicleSubs = ["Vehicle Maintenance", "Vehicle Expense", "RTO", "Fast Tag", "Insurance", "Other Point Expense"];
  if (vehicleSubs.includes(String(payload.expenseSubCategory)) && !payload.vehicleId) return "Vehicle is required.";
  if (payload.expenseSubCategory === "Vehicle Maintenance" && (!payload.vendor || payload.spareAmount === null || payload.labourAmount === null)) return "Vendor, spare amount and labour amount are required.";
  if (["RTO", "Fast Tag", "Insurance", "Other Point Expense"].includes(String(payload.expenseSubCategory)) && !payload.vendor) return "Vendor is required.";
  if (payload.expenseSubCategory === "Tyre" && payload.count === null) return "Count is required.";
  if (payload.expenseSubCategory === "Office" && (!payload.employeeName || !payload.month)) return "Employee and month are required.";
  if (payload.expenseSubCategory === "Driver" && (!payload.driverId || !payload.vehicleId || !payload.month)) return "Driver, vehicle and month are required.";
  if (payload.expenseSubCategory !== "Vehicle Maintenance" && payload.amount === null) return "Amount is required.";
  return null;
};

export const createExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const payload = normalizePayload(req.body);
    const error = await validationError(payload);
    if (error) { res.status(400).json({ success: false, message: error }); return; }
    const expense = await Expense.create({ ...payload, createdBy: req.user?.id, updatedBy: req.user?.id });
    res.status(201).json({ success: true, message: "Expense created successfully.", data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Failed to create expense." });
  }
};

export const getExpenses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = "1", limit = "10", search = "", expenseCategory, expenseSubCategory, startDate, endDate, sortBy = "expenseDate", sortOrder = "desc" } = req.query;
    const filter: Record<string, unknown> = { isDeleted: false };
    if (expenseCategory) filter.expenseCategory = expenseCategory;
    if (expenseSubCategory) filter.expenseSubCategory = expenseSubCategory;
    if (startDate || endDate) filter.expenseDate = { ...(startDate ? { $gte: new Date(String(startDate)) } : {}), ...(endDate ? { $lte: new Date(`${String(endDate)}T23:59:59.999Z`) } : {}) };
    if (search) {
      const regex = new RegExp(String(search), "i");
      filter.$or = [{ expenseCategory: regex }, { expenseSubCategory: regex }, { vendor: regex }, { notes: regex }, { employeeName: regex }];
    }
    const pageNumber = Math.max(1, Number(page));
    const pageLimit = Math.max(1, Math.min(100, Number(limit)));
    const total = await Expense.countDocuments(filter);
    const data = await Expense.find(filter)
      .populate("vehicleId", "vehicleNumber")
      .populate("driverId", "name")
      .sort({ [String(sortBy)]: sortOrder === "asc" ? 1 : -1 })
      .skip((pageNumber - 1) * pageLimit).limit(pageLimit);
    res.status(200).json({ success: true, data, pagination: { page: pageNumber, limit: pageLimit, total, totalPages: Math.ceil(total / pageLimit) } });
  } catch (error) {
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Failed to fetch expenses." });
  }
};

export const getExpenseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, isDeleted: false }).populate("vehicleId", "vehicleNumber").populate("driverId", "name");
    if (!expense) { res.status(404).json({ success: false, message: "Expense not found." }); return; }
    res.status(200).json({ success: true, data: expense });
  } catch { res.status(500).json({ success: false, message: "Failed to fetch expense." }); }
};

export const updateExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const payload = normalizePayload(req.body);
    const error = await validationError(payload);
    if (error) { res.status(400).json({ success: false, message: error }); return; }
    const expense = await Expense.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { ...payload, updatedBy: req.user?.id }, { new: true, runValidators: true });
    if (!expense) { res.status(404).json({ success: false, message: "Expense not found." }); return; }
    res.status(200).json({ success: true, message: "Expense updated successfully.", data: expense });
  } catch (error) { res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Failed to update expense." }); }
};

export const deleteExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const expense = await Expense.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!expense) { res.status(404).json({ success: false, message: "Expense not found." }); return; }
    res.status(200).json({ success: true, message: "Expense deleted successfully." });
  } catch { res.status(500).json({ success: false, message: "Failed to delete expense." }); }
};
