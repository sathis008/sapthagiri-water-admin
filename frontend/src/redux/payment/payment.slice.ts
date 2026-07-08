import { createSlice } from "@reduxjs/toolkit";

import type { Payment, PaymentItem } from "@/types/payment";
import type { Booking, Pagination } from "@/types/booking";

import {
  getPaymentsThunk,
  createPaymentThunk,
  deletePaymentThunk,
  getPaymentByIdThunk,
  getPendingBookingsThunk,
} from "./payment.thunk";

interface PaymentState {
  payments: Payment[];

  selectedPayment: Payment | null;

  pendingBookings: Booking[];

  pagination: Pagination;

  loading: boolean;

  error: string | null;

  paymentItems: PaymentItem[];
}

const initialState: PaymentState = {
  payments: [],

  selectedPayment: null,

  pendingBookings: [],

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  paymentItems: [],

  loading: false,

  error: null,
};

const paymentSlice = createSlice({
  name: "payment",

  initialState,

  reducers: {
    clearSelectedPayment: (state) => {
      state.selectedPayment = null;
    },
  },

  extraReducers: (builder) => {
    /**
     * Get Payments
     */
    builder
      .addCase(getPaymentsThunk.pending, (state) => {
        state.loading = true;

        state.error = null;
      })
      .addCase(getPaymentsThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.payments = action.payload.data;

        state.pagination = action.payload.pagination;
      })
      .addCase(getPaymentsThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });

    /**
     * Get Payment By Id
     */
    builder
      .addCase(getPaymentByIdThunk.pending, (state) => {
        state.loading = true;

        state.error = null;
      })
      .addCase(getPaymentByIdThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedPayment = action.payload.payment;
        state.paymentItems = action.payload.items;
      })
      .addCase(getPaymentByIdThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });

    /**
     * Create Payment
     */
    builder
      .addCase(createPaymentThunk.pending, (state) => {
        state.loading = true;

        state.error = null;
      })
      .addCase(createPaymentThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPaymentThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });

    /**
     * Pending Bookings
     */
    builder
      .addCase(getPendingBookingsThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getPendingBookingsThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.pendingBookings = action.payload;
      })

      .addCase(getPendingBookingsThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });

    /**
     * Delete Payment
     */
    builder
      .addCase(deletePaymentThunk.pending, (state) => {
        state.loading = true;

        state.error = null;
      })
      .addCase(deletePaymentThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.payments = state.payments.filter(
          (payment) => payment._id !== action.payload,
        );
      })
      .addCase(deletePaymentThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
