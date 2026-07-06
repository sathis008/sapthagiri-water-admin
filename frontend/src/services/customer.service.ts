import api from "@/api/axios";
import { API_ENDPOINTS } from "@/api/endpoints";

import type {
  Customer,
  CustomerListResponse,
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "@/types/customer";

class CustomerService {
  /**
   * Get All Customers
   */
  async getCustomers(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<CustomerListResponse> {
    const response = await api.get<CustomerListResponse>(
      API_ENDPOINTS.CUSTOMER.LIST,
      {
        params,
      },
    );

    return response.data;
  }

  /**
   * Get Customer By Id
   */
  async getCustomerById(id: string): Promise<Customer> {
    const response = await api.get<Customer>(
      API_ENDPOINTS.CUSTOMER.DETAILS(id),
    );

    return response.data;
  }

  /**
   * Create Customer
   */
  async createCustomer(payload: CreateCustomerRequest): Promise<Customer> {
    const response = await api.post<Customer>(
      API_ENDPOINTS.CUSTOMER.CREATE,
      payload,
    );

    return response.data;
  }

  /**
   * Update Customer
   */
  async updateCustomer(
    id: string,
    payload: UpdateCustomerRequest,
  ): Promise<Customer> {
    const response = await api.put<Customer>(
      API_ENDPOINTS.CUSTOMER.UPDATE(id),
      payload,
    );

    return response.data;
  }

  /**
   * Delete Customer
   */
  async deleteCustomer(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.CUSTOMER.DELETE(id));
  }
}

export default new CustomerService();
