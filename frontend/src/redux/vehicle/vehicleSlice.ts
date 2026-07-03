import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { Vehicle } from '@/types/vehicle';

import {
  getVehiclesThunk,
  createVehicleThunk,
  updateVehicleThunk,
  deleteVehicleThunk,
  uploadVehicleDocumentThunk,
} from './vehicleThunk';

interface VehicleState {
  vehicles: Vehicle[];

  loading: boolean;

  error: string | null;
}

const initialState: VehicleState = {
  vehicles: [],

  loading: false,

  error: null,
};

const vehicleSlice = createSlice({
  name: 'vehicle',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      /**
       * Get Vehicles
       */
      .addCase(getVehiclesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getVehiclesThunk.fulfilled, (state, action: PayloadAction<Vehicle[]>) => {
        state.loading = false;
        state.vehicles = action.payload;
      })

      .addCase(getVehiclesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /**
       * Create Vehicle
       */
      .addCase(createVehicleThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(createVehicleThunk.fulfilled, (state, action: PayloadAction<Vehicle>) => {
        state.loading = false;

        state.vehicles.unshift(action.payload);
      })

      .addCase(createVehicleThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })

      /**
       * Update Vehicle
       */
      .addCase(updateVehicleThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateVehicleThunk.fulfilled, (state, action: PayloadAction<Vehicle>) => {
        state.loading = false;

        const index = state.vehicles.findIndex((vehicle) => vehicle._id === action.payload._id);

        if (index !== -1) {
          state.vehicles[index] = action.payload;
        }
      })

      .addCase(updateVehicleThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })

      /**
       * Delete Vehicle
       */
      .addCase(deleteVehicleThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteVehicleThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;

        state.vehicles = state.vehicles.filter((vehicle) => vehicle._id !== action.payload);
      })

      .addCase(deleteVehicleThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })

      /**
       * Upload Document
       */
      .addCase(uploadVehicleDocumentThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(uploadVehicleDocumentThunk.fulfilled, (state, action: PayloadAction<Vehicle>) => {
        state.loading = false;

        const index = state.vehicles.findIndex((vehicle) => vehicle._id === action.payload._id);

        if (index !== -1) {
          state.vehicles[index] = action.payload;
        }
      })

      .addCase(uploadVehicleDocumentThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      });
  },
});

export default vehicleSlice.reducer;
