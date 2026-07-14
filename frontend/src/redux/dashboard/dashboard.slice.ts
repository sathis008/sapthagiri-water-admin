import { createSlice } from "@reduxjs/toolkit";

import type { DashboardData } from "@/types/dashboard";

import { getDashboardThunk } from "./dashboard.thunk";

interface DashboardState {
  data: DashboardData | null;

  loading: boolean;

  error: string | null;
}

const initialState: DashboardState = {
  data: null,

  loading: false,

  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getDashboardThunk.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getDashboardThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.data = action.payload;
      })

      .addCase(getDashboardThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
