import { createSlice } from "@reduxjs/toolkit";

import type { CustomerState } from "./customerTypes";

import {
  createCustomerThunk,
  updateCustomerThunk,
  deleteCustomerThunk,
  getCustomersThunk,
  searchCustomersThunk,
} from "./customerThunk";

const initialState: CustomerState = {
  customers: [],

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  selectedCustomer: null,

  loading: false,

  error: null,
};

const customerSlice = createSlice({
  name: "customer",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    /**
     * Get Customers
     */
    builder
      .addCase(getCustomersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCustomersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.data;
        state.pagination = action.payload.pagination;
      })

      .addCase(getCustomersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /**
     * Search Customers
     */
    builder
      .addCase(searchCustomersThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(searchCustomersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.data;
        state.pagination = action.payload.pagination;
      })

      .addCase(searchCustomersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /**
     * Create Customer
     */
    builder
      .addCase(createCustomerThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(createCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.unshift(action.payload);
      })

      .addCase(createCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /**
     * Update Customer
     */
    builder
      .addCase(updateCustomerThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.customers = state.customers.map((customer) =>
          customer._id === action.payload._id ? action.payload : customer,
        );
      })

      .addCase(updateCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /**
     * Delete Customer
     */
    builder
      .addCase(deleteCustomerThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.customers = state.customers.filter(
          (customer) => customer._id !== action.payload,
        );
      })

      .addCase(deleteCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default customerSlice.reducer;
