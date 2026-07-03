import { createSlice } from '@reduxjs/toolkit';

import type { Driver } from '@/types/driver';

import {
  getDriversThunk,
  createDriverThunk,
  updateDriverThunk,
  deleteDriverThunk,
  uploadDriverLicenseThunk,
} from './driverThunk';

interface DriverState {
  drivers: Driver[];

  loading: boolean;

  error: string | null;
}

const initialState: DriverState = {
  drivers: [],

  loading: false,

  error: null,
};

const driverSlice = createSlice({
  name: 'driver',

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

        state.drivers = action.payload;
      })

      .addCase(getDriversThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });

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
          driver._id === action.payload._id ? action.payload : driver
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

        state.drivers = state.drivers.filter((driver) => driver._id !== action.payload);
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
          driver._id === action.payload.data._id ? action.payload.data : driver
        );
      })

      .addCase(uploadDriverLicenseThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });
  },
});

export default driverSlice.reducer;
