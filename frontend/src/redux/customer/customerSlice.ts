import { createSlice } from "@reduxjs/toolkit";

import type { CustomerState } from "./customerTypes";

import { deleteCustomerThunk, getCustomersThunk, updateCustomerThunk } from "./customerThunk";

const initialState: CustomerState = {
  customers: [],

  selectedCustomer: null,

  loading: false,

  error: null,
};

const customerSlice = createSlice({
  name: "customer",

  initialState,

  reducers: {},

  extraReducers(builder) {

    builder

      .addCase(
        getCustomersThunk.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )

      .addCase(
        getCustomersThunk.fulfilled,
        (state, action) => {

          state.loading = false;

          state.customers = action.payload;

        }
      )
            .addCase(updateCustomerThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateCustomerThunk.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateCustomerThunk.rejected, (state) => {
        state.loading = false;
      })

      .addCase(deleteCustomerThunk.pending, (state) => {
  state.loading = true;
})

      .addCase(deleteCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.customers = state.customers.filter(
          (customer) => customer._id !== action.payload
        );
      })

      .addCase(deleteCustomerThunk.rejected, (state) => {
        state.loading = false;
      })

      .addCase(
        getCustomersThunk.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload as string;

        }
      );
      

  },
});

export default customerSlice.reducer;