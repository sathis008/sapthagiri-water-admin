import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import CustomerService from "@/services/customer.service";

import type {
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CustomerListResponse,
} from "@/types/customer";

/**
 * Create Customer
 */
export const createCustomerThunk = createAsyncThunk(
  "customer/createCustomer",
  async (payload: CreateCustomerRequest, { rejectWithValue }) => {
    try {
      return await CustomerService.createCustomer(payload);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to create customer.",
      );
    }
  },
);

/**
 * Update Customer
 */
export const updateCustomerThunk = createAsyncThunk(
  "customer/updateCustomer",
  async (
    {
      id,
      payload,
    }: {
      id: string;
      payload: UpdateCustomerRequest;
    },
    { rejectWithValue },
  ) => {
    try {
      return await CustomerService.updateCustomer(id, payload);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to update customer.",
      );
    }
  },
);

/**
 * Get Customers
 */
export const getCustomersThunk = createAsyncThunk<
  CustomerListResponse,
  void,
  {
    rejectValue: string;
  }
>("customer/getCustomers", async (_, { rejectWithValue }) => {
  try {
    return await CustomerService.getCustomers();
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      axiosError.response?.data?.message ?? "Failed to fetch customers.",
    );
  }
});

/**
 * Search Customers
 */
export const searchCustomersThunk = createAsyncThunk<
  CustomerListResponse,
  {
    page?: number;
    limit?: number;
    search?: string;
  },
  {
    rejectValue: string;
  }
>("customer/searchCustomers", async (params, { rejectWithValue }) => {
  try {
    return await CustomerService.getCustomers(params);
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      axiosError.response?.data?.message ?? "Failed to search customers.",
    );
  }
});

/**
 * Delete Customer
 */
export const deleteCustomerThunk = createAsyncThunk(
  "customer/deleteCustomer",
  async (id: string, { rejectWithValue }) => {
    try {
      await CustomerService.deleteCustomer(id);

      return id;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to delete customer.",
      );
    }
  },
);
