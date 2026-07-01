import { createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "@/services/auth.service";
import { Storage } from "@/utills/storage";
import type { LoginRequest } from "@/types/auth";
import type { AxiosError } from "axios";

export const loginThunk = createAsyncThunk(
  "auth/login",

  async (payload: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(payload);
      // save authentication on local storage
      Storage.setToken(response.data.token);
      Storage.setUser(response.data.user);

      return response.data;

    } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;

    return rejectWithValue(
        axiosError.response?.data?.message ?? "Login Failed"
    );
}
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async () => {
    // If backend has logout API
    await AuthService.logout();

    // Clear Local Storage
    Storage.clear();

    return true;
  }
);