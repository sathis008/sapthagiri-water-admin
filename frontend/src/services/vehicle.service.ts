import api from '@/api/axios';
import { API_ENDPOINTS } from '@/api/endpoints';

import type {
  Vehicle,
  VehicleListResponse,
  CreateVehicleRequest,
  UpdateVehicleRequest,
} from '@/types/vehicle';

class VehicleService {
  /**
   * Get All Vehicles
   */
  async getVehicles(): Promise<Vehicle[]> {
    const response = await api.get<VehicleListResponse>(API_ENDPOINTS.VEHICLE.LIST);

    return response.data.data;
  }

  /**
   * Get Vehicle By Id
   */
  async getVehicleById(id: string): Promise<Vehicle> {
    const response = await api.get<{
      success: boolean;
      data: Vehicle;
    }>(API_ENDPOINTS.VEHICLE.DETAILS(id));

    return response.data.data;
  }

  /**
   * Create Vehicle
   */
  async createVehicle(payload: CreateVehicleRequest): Promise<Vehicle> {
    const response = await api.post<{
      success: boolean;
      data: Vehicle;
    }>(API_ENDPOINTS.VEHICLE.CREATE, payload);

    return response.data.data;
  }

  /**
   * Update Vehicle
   */
  async updateVehicle(id: string, payload: UpdateVehicleRequest): Promise<Vehicle> {
    const response = await api.put<{
      success: boolean;
      data: Vehicle;
    }>(API_ENDPOINTS.VEHICLE.UPDATE(id), payload);

    return response.data.data;
  }

  /**
   * Delete Vehicle
   */
  async deleteVehicle(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.VEHICLE.DELETE(id));
  }

  /**
   * Upload Vehicle Document
   */
  async uploadVehicleDocument(id: string, documentType: string, file: File) {
    const formData = new FormData();

    formData.append('file', file);

    const response = await api.post(API_ENDPOINTS.VEHICLE.UPLOAD(id, documentType), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }
}

export default new VehicleService();
