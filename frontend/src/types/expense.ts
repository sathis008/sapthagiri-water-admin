import type { Pagination } from "@/types/vehicle";

export type ExpenseCategory = "Vehicle Expense" | "Office Expense" | "Salary Expense";

export interface Expense {
  _id: string;
  expenseCategory: ExpenseCategory;
  expenseSubCategory: string;
  vehicleId?: { _id: string; vehicleNumber: string } | string | null;
  driverId?: { _id: string; name: string } | string | null;
  employeeName?: string | null;
  vendor?: string | null;
  notes?: string | null;
  amount?: number | null;
  spareAmount?: number | null;
  labourAmount?: number | null;
  diesel?: number | null;
  dieselAmount?: number | null;
  mileage?: number | null;
  count?: number | null;
  month?: string | null;
  expiryDate?: string | null;
  expenseDate: string;
  createdAt: string;
  updatedAt: string;
}

export type ExpensePayload = Omit<Expense, "_id" | "createdAt" | "updatedAt" | "vehicleId" | "driverId"> & {
  vehicleId?: string | null;
  driverId?: string | null;
};

export interface ExpenseListResponse { success: boolean; data: Expense[]; pagination: Pagination; }

export interface ExpenseQuery {
  page?: number;
  limit?: number;
  search?: string;
  expenseCategory?: string;
  expenseSubCategory?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
