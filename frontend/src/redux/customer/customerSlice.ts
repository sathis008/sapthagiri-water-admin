import { createSlice } from "@reduxjs/toolkit";

import type { CustomerState } from "./customerTypes";

import { getCustomersThunk } from "./customerThunk";

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