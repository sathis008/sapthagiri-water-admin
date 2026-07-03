import api from "@/api/axios";

import { API_ENDPOINTS } from "@/api/endpoints";
import type { ApiResponse } from "@/types/api";

import type {
  Driver,
  DriverListResponse,
  CreateDriverRequest,
  UpdateDriverRequest,
} from "@/types/driver";

class DriverService {

  /**
   * Get All Drivers
   */
  async getDrivers(): Promise<Driver[]> {

    const response =
      await api.get<DriverListResponse>(
        API_ENDPOINTS.DRIVER.LIST
      );

    return response.data.data;

  }

  /**
   * Get Driver By Id
   */
  async getDriverById(
    id: string
  ): Promise<Driver> {

    const response =
      await api.get<Driver>(
        API_ENDPOINTS.DRIVER.DETAILS(id)
      );

    return response.data;

  }

  /**
   * Create Driver
   */
async createDriver(
  payload: CreateDriverRequest
): Promise<Driver> {

  const response =
  await api.post<ApiResponse<Driver>>(
    API_ENDPOINTS.DRIVER.CREATE,
    payload
  );

  return response.data.data;

}
  /**
   * Update Driver
   */
async updateDriver(
  id: string,
  payload: UpdateDriverRequest
): Promise<Driver> {

  const response =
    await api.put<ApiResponse<Driver>>(
      API_ENDPOINTS.DRIVER.UPDATE(id),
      payload
    );

  return response.data.data;
}

  /**
   * Delete Driver
   */
  async deleteDriver(
    id: string
  ): Promise<void> {

    await api.delete(
      API_ENDPOINTS.DRIVER.DELETE(id)
    );

  }

  /**
   * Upload License
   */
  async uploadLicense(
    id: string,
    file: File
  ) {

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    return api.post(
      API_ENDPOINTS.DRIVER.UPLOAD(id),
      formData
    );

  }

}

export default new DriverService();