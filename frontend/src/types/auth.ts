/**
 * Login Request
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Role values — must match backend User model enum exactly
 */
export type UserRole = "ADMIN" | "MANAGER";

/**
 * User
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
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
