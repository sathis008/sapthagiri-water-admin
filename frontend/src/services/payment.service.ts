import api from "@/api/axios";
import { API_ENDPOINTS } from "@/api/endpoints";

import type {
  Payment,
  PaymentItem,
  PaymentListResponse,
  CreatePaymentRequest,
} from "@/types/payment";

import type { ApiResponse } from "@/types/api";

class PaymentService {
  /**
   * Get Payments
   */
  async getPayments(
    params?: Record<string, unknown>,
  ): Promise<PaymentListResponse> {
    const response = await api.get<PaymentListResponse>(
      API_ENDPOINTS.PAYMENT.LIST,
      {
        params,
      },
    );

    return response.data;
  }

  /**
   * Get Payment By Id
   */
  async getPaymentById(id: string): Promise<{
    payment: Payment;
    items: PaymentItem[];
  }> {
    const response = await api.get<
      ApiResponse<{
        payment: Payment;
        items: PaymentItem[];
      }>
    >(API_ENDPOINTS.PAYMENT.DETAILS(id));

    return response.data.data;
  }

  /**
   * Create Payment
   */
  async createPayment(payload: CreatePaymentRequest): Promise<Payment> {
    const response = await api.post<ApiResponse<Payment>>(
      API_ENDPOINTS.PAYMENT.CREATE,
      payload,
    );

    return response.data.data;
  }

  /**
   * Delete Payment
   */
  async deletePayment(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.PAYMENT.DELETE(id));
  }
}

export default new PaymentService();
