import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import BookingService from "@/services/booking.service";

import type {
  CreateBookingRequest,
  UpdateBookingRequest,
  AssignBookingRequest,
  CompleteDeliveryRequest,
} from "@/types/booking";

/**
 * Get Bookings
 */
export const getBookingsThunk = createAsyncThunk(
  "booking/getBookings",
  async (params: Record<string, unknown>, { rejectWithValue }) => {
    try {
      return await BookingService.getBookings(params);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to fetch bookings.",
      );
    }
  },
);

/**
 * Create Booking
 */
export const createBookingThunk = createAsyncThunk(
  "booking/createBooking",
  async (payload: CreateBookingRequest, { rejectWithValue }) => {
    try {
      return await BookingService.createBooking(payload);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to create booking.",
      );
    }
  },
);

/**
 * Update Booking
 */
export const updateBookingThunk = createAsyncThunk(
  "booking/updateBooking",
  async (
    {
      id,
      payload,
    }: {
      id: string;
      payload: UpdateBookingRequest;
    },
    { rejectWithValue },
  ) => {
    try {
      return await BookingService.updateBooking(id, payload);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to update booking.",
      );
    }
  },
);

/**
 * Delete Booking
 */
export const deleteBookingThunk = createAsyncThunk(
  "booking/deleteBooking",
  async (id: string, { rejectWithValue }) => {
    try {
      await BookingService.deleteBooking(id);

      return id;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to delete booking.",
      );
    }
  },
);

/**
 * Assign Booking
 */
export const assignBookingThunk = createAsyncThunk(
  "booking/assignBooking",
  async (
    {
      id,
      payload,
    }: {
      id: string;
      payload: AssignBookingRequest;
    },
    { rejectWithValue },
  ) => {
    try {
      return await BookingService.assignBooking(id, payload);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to assign booking.",
      );
    }
  },
);

/**
 * Complete Delivery
 */
export const completeDeliveryThunk = createAsyncThunk(
  "booking/completeDelivery",
  async (
    {
      id,
      payload,
    }: {
      id: string;
      payload: CompleteDeliveryRequest;
    },
    { rejectWithValue },
  ) => {
    try {
      return await BookingService.completeDelivery(id, payload);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to complete delivery.",
      );
    }
  },
);

/**
 * Get Booking By Id
 */
export const getBookingByIdThunk = createAsyncThunk(
  "booking/getBookingById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await BookingService.getBookingById(id);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to fetch booking.",
      );
    }
  },
);
