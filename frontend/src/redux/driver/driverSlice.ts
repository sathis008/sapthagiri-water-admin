import { createSlice } from "@reduxjs/toolkit";

import type { Driver } from "@/types/driver";

import {
  getDriversThunk,
  createDriverThunk,
  updateDriverThunk,
  deleteDriverThunk,
  uploadDriverLicenseThunk,
  searchDriversThunk,
  getEmployeesThunk,
  createEmployeeThunk,
  updateEmployeeThunk,
  deleteEmployeeThunk,
} from "./driverThunk";

interface DriverState {
  drivers: Driver[];
  employees: Driver[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  selectedDriver: Driver | null;

  loading: boolean;

  error: string | null;
}

const initialState: DriverState = {
  drivers: [],
  employees: [],

  pagination: {
    page: 1,

    limit: 10,

    total: 0,

    totalPages: 0,
  },

  selectedDriver: null,

  loading: false,

  error: null,
};

const driverSlice = createSlice({
  name: "driver",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    /**
     * Get Drivers
     */
    builder

      .addCase(getDriversThunk.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getDriversThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.drivers = action.payload.data;

        state.pagination = action.payload.pagination;
      })

      .addCase(searchDriversThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(searchDriversThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.drivers = action.payload.data;

        state.pagination = action.payload.pagination;
      })

      .addCase(searchDriversThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })

      .addCase(getDriversThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })
      .addCase(getEmployeesThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getEmployeesThunk.fulfilled, (state, action) => { state.loading = false; state.employees = action.payload.data; })
      .addCase(getEmployeesThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

    /**
     * Create Driver
     */
    builder

      .addCase(createDriverThunk.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(createDriverThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.drivers.unshift(action.payload);
      })

      .addCase(createDriverThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });

    /**
     * Update Driver
     */
    builder

      .addCase(updateDriverThunk.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(updateDriverThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.drivers = state.drivers.map((driver) =>
          driver._id === action.payload._id ? action.payload : driver,
        );
      })

      .addCase(updateDriverThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });

    /**
     * Delete Driver
     */
    builder

      .addCase(deleteDriverThunk.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(deleteDriverThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.drivers = state.drivers.filter(
          (driver) => driver._id !== action.payload,
        );
      })

      .addCase(deleteDriverThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });

    /**
     * Upload Driver License
     */
    builder

      .addCase(uploadDriverLicenseThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(uploadDriverLicenseThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.drivers = state.drivers.map((driver) =>
          driver._id === action.payload.data._id ? action.payload.data : driver,
        );
      })

      .addCase(uploadDriverLicenseThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })
      .addCase(createEmployeeThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createEmployeeThunk.fulfilled, (state, action) => { state.loading = false; state.employees.unshift(action.payload); if (action.payload.isDriver) state.drivers.unshift(action.payload); })
      .addCase(createEmployeeThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(updateEmployeeThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateEmployeeThunk.fulfilled, (state, action) => { state.loading = false; state.employees = state.employees.map((employee) => employee._id === action.payload._id ? action.payload : employee); state.drivers = action.payload.isDriver ? [...state.drivers.filter((driver) => driver._id !== action.payload._id), action.payload] : state.drivers.filter((driver) => driver._id !== action.payload._id); })
      .addCase(updateEmployeeThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(deleteEmployeeThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteEmployeeThunk.fulfilled, (state, action) => { state.loading = false; state.employees = state.employees.filter((employee) => employee._id !== action.payload); state.drivers = state.drivers.filter((driver) => driver._id !== action.payload); });
  },
});

export default driverSlice.reducer;
