import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import VehicleService from "@/services/vehicle.service";

import type {
  CreateVehicleRequest,
  UpdateVehicleRequest,
  VehicleListResponse,
} from "@/types/vehicle";

/**
 * Get Vehicles
 */
interface VehicleQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export const getVehiclesThunk = createAsyncThunk<
  VehicleListResponse,
  VehicleQuery | undefined,
  {
    rejectValue: string;
  }
>("vehicle/getVehicles", async (params, { rejectWithValue }) => {
  try {
    return await VehicleService.getVehicles(params);
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{
      message: string;
    }>;

    return rejectWithValue(
      axiosError.response?.data?.message ?? "Failed to fetch vehicles.",
    );
  }
});

/**
 * Create Vehicle
 */
export const createVehicleThunk = createAsyncThunk(
  "vehicle/createVehicle",

  async (payload: CreateVehicleRequest, { rejectWithValue }) => {
    try {
      return await VehicleService.createVehicle(payload);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{
        message: string;
      }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to create vehicle.",
      );
    }
  },
);

/**
 * Update Vehicle
 */
export const updateVehicleThunk = createAsyncThunk(
  "vehicle/updateVehicle",

  async (
    {
      id,
      payload,
    }: {
      id: string;
      payload: UpdateVehicleRequest;
    },
    { rejectWithValue },
  ) => {
    try {
      return await VehicleService.updateVehicle(id, payload);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{
        message: string;
      }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to update vehicle.",
      );
    }
  },
);

/**
 * Delete Vehicle
 */
export const deleteVehicleThunk = createAsyncThunk(
  "vehicle/deleteVehicle",

  async (id: string, { rejectWithValue }) => {
    try {
      await VehicleService.deleteVehicle(id);

      return id;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{
        message: string;
      }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to delete vehicle.",
      );
    }
  },
);

/**
 * Upload Vehicle Document
 */
export const uploadVehicleDocumentThunk = createAsyncThunk(
  "vehicle/uploadDocument",

  async (
    {
      id,
      documentType,
      file,
    }: {
      id: string;
      documentType: string;
      file: File;
    },
    { rejectWithValue },
  ) => {
    try {
      return await VehicleService.uploadVehicleDocument(id, documentType, file);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{
        message: string;
      }>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to upload document.",
      );
    }
  },
);

export const searchVehiclesThunk = createAsyncThunk<
  VehicleListResponse,
  {
    page?: number;
    limit?: number;
    search?: string;
  },
  {
    rejectValue: string;
  }
>("vehicle/searchVehicles", async (params, { rejectWithValue }) => {
  try {
    return await VehicleService.getVehicles(params);
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      axiosError.response?.data?.message ?? "Failed to search vehicles.",
    );
  }
});
