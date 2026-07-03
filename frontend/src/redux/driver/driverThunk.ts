import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import DriverService from '@/services/driver.service';

import type { CreateDriverRequest, UpdateDriverRequest } from '@/types/driver';

/**
 * Create Driver
 */
export const createDriverThunk = createAsyncThunk(
  'driver/createDriver',

  async (payload: CreateDriverRequest, { rejectWithValue }) => {
    try {
      const response = await DriverService.createDriver(payload);

      return response;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{
        message: string;
      }>;

      return rejectWithValue(axiosError.response?.data?.message ?? 'Failed to create driver.');
    }
  }
);

/**
 * Get Drivers
 */
export const getDriversThunk = createAsyncThunk(
  'driver/getDrivers',

  async (_, { rejectWithValue }) => {
    try {
      return await DriverService.getDrivers();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{
        message: string;
      }>;

      return rejectWithValue(axiosError.response?.data?.message ?? 'Failed to fetch drivers.');
    }
  }
);

/**
 * Update Driver
 */
export const updateDriverThunk = createAsyncThunk(
  'driver/updateDriver',

  async (
    {
      id,
      payload,
    }: {
      id: string;
      payload: UpdateDriverRequest;
    },
    { rejectWithValue }
  ) => {
    try {
      return await DriverService.updateDriver(id, payload);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{
        message: string;
      }>;

      return rejectWithValue(axiosError.response?.data?.message ?? 'Failed to update driver.');
    }
  }
);

/**
 * Delete Driver
 */
export const deleteDriverThunk = createAsyncThunk(
  'driver/deleteDriver',

  async (id: string, { rejectWithValue }) => {
    try {
      await DriverService.deleteDriver(id);

      return id;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{
        message: string;
      }>;

      return rejectWithValue(axiosError.response?.data?.message ?? 'Failed to delete driver.');
    }
  }
);
/**
 * Upload Driver License
 */
export const uploadDriverLicenseThunk = createAsyncThunk(
  'driver/uploadDriverLicense',

  async (
    {
      id,
      file,
    }: {
      id: string;
      file: File;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await DriverService.uploadLicense(id, file);

      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{
        message: string;
      }>;

      return rejectWithValue(axiosError.response?.data?.message ?? 'Failed to upload license.');
    }
  }
);
