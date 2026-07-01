/**
 * Login Request
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * User
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

/**
 * Login Response
 */
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}