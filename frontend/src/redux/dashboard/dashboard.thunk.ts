import { createAsyncThunk } from "@reduxjs/toolkit";

import { AxiosError } from "axios";

import DashboardService from "@/services/dashboard.service";

export const getDashboardThunk = createAsyncThunk(
  "dashboard/getDashboard",

  async (_, { rejectWithValue }) => {
    try {
      return await DashboardService.getDashboard();
    } catch (error) {
      const axiosError = error as AxiosError<{
        message: string;
      }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to fetch dashboard.",
      );
    }
  },
);
