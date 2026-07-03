import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import CustomerService from "@/services/customer.service";
import type {
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "@/types/customer";

export const createCustomerThunk = createAsyncThunk(
  "customer/createCustomer",

  async (
    payload: CreateCustomerRequest,
    { rejectWithValue }
  ) => {
    try {
      const customer =
        await CustomerService.createCustomer(payload);

      return customer;

    } catch (error: unknown) {

      const axiosError = error as AxiosError<{
        message: string;
      }>;

      return rejectWithValue(
        axiosError.response?.data?.message ??
          "Failed to create customer."
      );

    }
  }
);

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
    { rejectWithValue }
  ) => {
    try {
      const customer = await CustomerService.updateCustomer(
        id,
        payload
      );

      return customer;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{
        message: string;
      }>;

      return rejectWithValue(
        axiosError.response?.data?.message ??
          "Failed to update customer."
      );
    }
  }
);

export const getCustomersThunk = createAsyncThunk(
  "customer/getCustomers",

  async (_, { rejectWithValue }) => {
    try {
      const customers = await CustomerService.getCustomers();

      return customers;

    } catch (error: unknown) {

        const axiosError = error as AxiosError<{
        message: string;
      }>;

      return rejectWithValue(
        axiosError.response?.data?.message ??
        "Failed to fetch customers."
      );

    }
  }
);

export const deleteCustomerThunk = createAsyncThunk(
  "customer/deleteCustomer",
  async (
    id: string,
    { rejectWithValue }
  ) => {
    try {
      await CustomerService.deleteCustomer(id);

      return id;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{
        message: string;
      }>;

      return rejectWithValue(
        axiosError.response?.data?.message ??
          "Failed to delete customer."
      );
    }
  }
);