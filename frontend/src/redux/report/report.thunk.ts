import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import ReportService from "@/services/report.service";

export const getBookingReportThunk = createAsyncThunk(
  "report/getBookingReport",

  async (params: Record<string, unknown>, { rejectWithValue }) => {
    try {
      return await ReportService.getBookingReport(params);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to fetch booking report.",
      );
    }
  },
);

export const getPaymentReportThunk = createAsyncThunk(
  "report/getPaymentReport",

  async (params: Record<string, unknown>, { rejectWithValue }) => {
    try {
      return await ReportService.getPaymentReport(params);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to fetch payment report.",
      );
    }
  },
);

export const getDriverSettlementThunk = createAsyncThunk(
  "report/getDriverSettlement",

  async (params: Record<string, unknown>, { rejectWithValue }) => {
    try {
      return await ReportService.getDriverSettlement(params);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to fetch settlement.",
      );
    }
  },
);

export const getDailyCollectionThunk = createAsyncThunk(
  "report/getDailyCollection",

  async (params: Record<string, unknown>, { rejectWithValue }) => {
    try {
      return await ReportService.getDailyCollection(params);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to fetch collection.",
      );
    }
  },
);

export const getCustomerLedgerThunk = createAsyncThunk(
  "report/getCustomerLedger",

  async (
    payload: {
      customerId: string;
      params?: Record<string, unknown>;
    },
    { rejectWithValue },
  ) => {
    try {
      return await ReportService.getCustomerLedger(
        payload.customerId,
        payload.params,
      );
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to fetch ledger.",
      );
    }
  },
);
