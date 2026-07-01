/**
 * API Endpoints
 */

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",

    REGISTER: "/api/auth/register",

    PROFILE: "/api/auth/profile",
      LOGOUT: "/api/auth/logout",
  },

   CUSTOMER: {
    LIST: "/api/customers",
    CREATE: "/api/customers",
    DETAILS: (id: string) => `/api/customers/${id}`,
    UPDATE: (id: string) => `/api/customers/${id}`,
    DELETE: (id: string) => `/api/customers/${id}`,
  },

  DRIVER: {
    LIST: "/api/drivers",

    CREATE: "/api/drivers",
  },

  VEHICLE: {
    LIST: "/api/vehicles",

    CREATE: "/api/vehicles",
  },
} as const;