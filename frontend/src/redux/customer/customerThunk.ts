import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import CustomerService from "@/services/customer.service";

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