import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ExpenseService from "@/services/expense.service";
import type { Expense, ExpenseListResponse, ExpensePayload, ExpenseQuery } from "@/types/expense";

const message = (error: unknown, fallback: string) => (error as AxiosError<{ message: string }>).response?.data?.message ?? fallback;

export const getExpensesThunk = createAsyncThunk<ExpenseListResponse, ExpenseQuery | undefined, { rejectValue: string }>("expense/getExpenses", async (params, { rejectWithValue }) => {
  try { return await ExpenseService.getExpenses(params); } catch (error) { return rejectWithValue(message(error, "Failed to fetch expenses.")); }
});
export const createExpenseThunk = createAsyncThunk<Expense, ExpensePayload, { rejectValue: string }>("expense/createExpense", async (payload, { rejectWithValue }) => {
  try { return await ExpenseService.createExpense(payload); } catch (error) { return rejectWithValue(message(error, "Failed to create expense.")); }
});
export const updateExpenseThunk = createAsyncThunk<Expense, { id: string; payload: ExpensePayload }, { rejectValue: string }>("expense/updateExpense", async ({ id, payload }, { rejectWithValue }) => {
  try { return await ExpenseService.updateExpense(id, payload); } catch (error) { return rejectWithValue(message(error, "Failed to update expense.")); }
});
export const deleteExpenseThunk = createAsyncThunk<string, string, { rejectValue: string }>("expense/deleteExpense", async (id, { rejectWithValue }) => {
  try { await ExpenseService.deleteExpense(id); return id; } catch (error) { return rejectWithValue(message(error, "Failed to delete expense.")); }
});
