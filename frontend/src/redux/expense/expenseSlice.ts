import { createSlice } from "@reduxjs/toolkit";
import type { Expense } from "@/types/expense";
import { createExpenseThunk, deleteExpenseThunk, getExpensesThunk, updateExpenseThunk } from "./expenseThunk";

interface ExpenseState { expenses: Expense[]; loading: boolean; error: string | null; pagination: { page: number; limit: number; total: number; totalPages: number }; }
const initialState: ExpenseState = { expenses: [], loading: false, error: null, pagination: { page: 1, limit: 100, total: 0, totalPages: 0 } };
const expenseSlice = createSlice({ name: "expense", initialState, reducers: {}, extraReducers: (builder) => builder
  .addCase(getExpensesThunk.pending, (state) => { state.loading = true; state.error = null; })
  .addCase(getExpensesThunk.fulfilled, (state, action) => { state.loading = false; state.expenses = action.payload.data; state.pagination = action.payload.pagination; })
  .addCase(getExpensesThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload ?? "Failed to fetch expenses."; })
  .addCase(createExpenseThunk.fulfilled, (state, action) => { state.expenses.unshift(action.payload); state.pagination.total += 1; })
  .addCase(updateExpenseThunk.fulfilled, (state, action) => { const index = state.expenses.findIndex((expense) => expense._id === action.payload._id); if (index >= 0) state.expenses[index] = action.payload; })
  .addCase(deleteExpenseThunk.fulfilled, (state, action) => { state.expenses = state.expenses.filter((expense) => expense._id !== action.payload); state.pagination.total = Math.max(0, state.pagination.total - 1); })
  .addCase(createExpenseThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload ?? "Failed to create expense."; })
  .addCase(updateExpenseThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload ?? "Failed to update expense."; })
  .addCase(deleteExpenseThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload ?? "Failed to delete expense."; })
});
export default expenseSlice.reducer;
