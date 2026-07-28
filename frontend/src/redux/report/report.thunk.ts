import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import ReportService from "@/services/report.service";
import type { ExpenseReportResponse, ProfitAndLossReport } from "@/types/report";

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

const reportThunk = <T,>(type: string, method: (params?: Record<string, unknown>) => Promise<T>, fallback: string) => createAsyncThunk<T, Record<string, unknown>, { rejectValue: string }>(
  type,
  async (params: Record<string, unknown>, { rejectWithValue }) => {
    try { return await method(params); } catch (error) { return rejectWithValue((error as AxiosError<{ message: string }>).response?.data?.message ?? fallback); }
  },
);

export const getExpenseReportThunk = reportThunk<ExpenseReportResponse>("report/getExpenseReport", ReportService.getExpenseReport.bind(ReportService), "Failed to fetch expense report.");
export const getVehicleExpenseReportThunk = reportThunk<ExpenseReportResponse>("report/getVehicleExpenseReport", ReportService.getVehicleExpenseReport.bind(ReportService), "Failed to fetch vehicle expense report.");
export const getSalaryReportThunk = reportThunk<ExpenseReportResponse>("report/getSalaryReport", ReportService.getSalaryReport.bind(ReportService), "Failed to fetch salary report.");
export const getProfitAndLossReportThunk = reportThunk<ProfitAndLossReport>("report/getProfitAndLossReport", ReportService.getProfitAndLossReport.bind(ReportService), "Failed to fetch profit and loss report.");

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
