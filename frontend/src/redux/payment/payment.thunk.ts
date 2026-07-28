import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import PaymentService from "@/services/payment.service";

import type { CreatePaymentRequest } from "@/types/payment";
import bookingService from "@/services/booking.service";

import type { Payment, PaymentItem } from "@/types/payment";

/**
 * Get Payments
 */
export const getPaymentsThunk = createAsyncThunk(
  "payment/getPayments",
  async (params: Record<string, unknown>, { rejectWithValue }) => {
    try {
      return await PaymentService.getPayments(params);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to fetch payments.",
      );
    }
  },
);

/**
 * Create Payment
 */
export const createPaymentThunk = createAsyncThunk(
  "payment/createPayment",
  async (payload: CreatePaymentRequest, { rejectWithValue }) => {
    try {
      return await PaymentService.createPayment(payload);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to create payment.",
      );
    }
  },
);

/**
 * Delete Payment
 */
export const deletePaymentThunk = createAsyncThunk(
  "payment/deletePayment",
  async (id: string, { rejectWithValue }) => {
    try {
      await PaymentService.deletePayment(id);

      return id;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to delete payment.",
      );
    }
  },
);

/**
 * Get Payment By Id
 */
export const getPaymentByIdThunk = createAsyncThunk<
  {
    payment: Payment;
    items: PaymentItem[];
  },
  string
>("payment/getPaymentById", async (id, { rejectWithValue }) => {
  try {
    return await PaymentService.getPaymentById(id);
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      axiosError.response?.data?.message ?? "Failed to fetch payment.",
    );
  }
});

/**
 * Get Pending Bookings
 */
export const getPendingBookingsThunk = createAsyncThunk(
  "payment/getPendingBookings",
  async (
    {
      customerId,
      driverId,
      fromDate,
      toDate,
    }: { customerId?: string; driverId?: string; fromDate?: string; toDate?: string },
    { rejectWithValue },
  ) => {
    try {
      return await bookingService.getPendingBookingsByCustomer(customerId, {
        driverId,
        fromDate,
        toDate,
      });
    } catch (error) {
      const axiosError = error as AxiosError<{
        message: string;
      }>;

      return rejectWithValue(
        axiosError.response?.data?.message ??
          "Failed to fetch pending bookings.",
      );
    }
  },
);
