import api from "@/api/axios";
import { API_ENDPOINTS } from "@/api/endpoints";
import type { Expense, ExpenseListResponse, ExpensePayload, ExpenseQuery } from "@/types/expense";

class ExpenseService {
  async getExpenses(params?: ExpenseQuery): Promise<ExpenseListResponse> {
    return (await api.get<ExpenseListResponse>(API_ENDPOINTS.EXPENSE.LIST, { params })).data;
  }
  async getExpense(id: string): Promise<Expense> {
    return (await api.get<{ data: Expense }>(API_ENDPOINTS.EXPENSE.DETAILS(id))).data.data;
  }
  async createExpense(payload: ExpensePayload): Promise<Expense> {
    return (await api.post<{ data: Expense }>(API_ENDPOINTS.EXPENSE.CREATE, payload)).data.data;
  }
  async updateExpense(id: string, payload: ExpensePayload): Promise<Expense> {
    return (await api.put<{ data: Expense }>(API_ENDPOINTS.EXPENSE.UPDATE(id), payload)).data.data;
  }
  async deleteExpense(id: string): Promise<void> { await api.delete(API_ENDPOINTS.EXPENSE.DELETE(id)); }
}
export default new ExpenseService();
