import { createSlice } from '@reduxjs/toolkit';

import type { Booking } from '@/types/booking';

import {
  getBookingsThunk,
  getBookingByIdThunk,
  createBookingThunk,
  updateBookingThunk,
  deleteBookingThunk,
  assignBookingThunk,
  completeDeliveryThunk,
} from './bookingThunk';

interface BookingState {
  bookings: Booking[];

  pagination: {
    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };

  selectedBooking: Booking | null;

  loading: boolean;

  error: string | null;
}

const initialState: BookingState = {
  bookings: [],

  pagination: {
    page: 1,

    limit: 10,

    total: 0,

    totalPages: 0,
  },

  selectedBooking: null,

  loading: false,

  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    /**
     * Get Bookings
     */
    builder

      .addCase(getBookingsThunk.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getBookingsThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.bookings = action.payload.data;

        state.pagination = action.payload.pagination;
      })

      .addCase(getBookingsThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });

    /**
     * Get Booking By Id
     */
    builder.addCase(getBookingByIdThunk.fulfilled, (state, action) => {
      state.selectedBooking = action.payload;
    });

    /**
     * Create Booking
     */
    builder

      .addCase(createBookingThunk.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(createBookingThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.bookings.unshift(action.payload);
      })

      .addCase(createBookingThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });

    /**
     * Update Booking
     */
    builder.addCase(updateBookingThunk.fulfilled, (state, action) => {
      state.bookings = state.bookings.map((booking) =>
        booking._id === action.payload._id ? action.payload : booking
      );
    });

    /**
     * Delete Booking
     */
    builder.addCase(deleteBookingThunk.fulfilled, (state, action) => {
      state.bookings = state.bookings.filter((booking) => booking._id !== action.payload);
    });

    /**
     * Assign Booking
     */
    builder.addCase(assignBookingThunk.fulfilled, (state, action) => {
      state.bookings = state.bookings.map((booking) =>
        booking._id === action.payload._id ? action.payload : booking
      );
    });

    /**
     * Complete Delivery
     */
    builder.addCase(completeDeliveryThunk.fulfilled, (state, action) => {
      state.bookings = state.bookings.map((booking) =>
        booking._id === action.payload._id ? action.payload : booking
      );
    });
  },
});

export default bookingSlice.reducer;
