import api from "@/api/axios";

import { API_ENDPOINTS } from "@/api/endpoints";

import type { DashboardData, DashboardResponse } from "@/types/dashboard";

class DashboardService {
  /**
   * Dashboard
   */
  async getDashboard(): Promise<DashboardData> {
    const response = await api.get<DashboardResponse>(
      API_ENDPOINTS.DASHBOARD.SUMMARY,
    );

    return response.data.data;
  }
}

export default new DashboardService();
