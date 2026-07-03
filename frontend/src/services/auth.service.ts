import api from '@/api/axios';
import { API_ENDPOINTS } from '@/api/endpoints';

import type { LoginRequest, LoginResponse } from '@/types/auth';

class AuthService {
  /**
   * Login
   */
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);

    return response.data;
  }

  /**
   * Get Logged-in User Profile
   */
  async getProfile() {
    const response = await api.get(API_ENDPOINTS.AUTH.PROFILE);

    return response.data;
  }

  /**
   * Logout
   *
   * If your backend has a logout API,
   * call it here. Otherwise, simply
   * clear the local authentication.
   */
  async logout(): Promise<void> {
    // Uncomment if your backend provides a logout endpoint.
    // await api.post(API_ENDPOINTS.AUTH.LOGOUT);

    return Promise.resolve();
  }
}

export default new AuthService();
