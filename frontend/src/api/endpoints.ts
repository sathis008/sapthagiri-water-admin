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

  VEHICLE: {
    LIST: "/api/vehicles",
    CREATE: "/api/vehicles",
    DETAILS: (id: string) => `/api/vehicles/${id}`,
    UPDATE: (id: string) => `/api/vehicles/${id}`,
    DELETE: (id: string) => `/api/vehicles/${id}`,
    UPLOAD: (id: string, documentType: string) =>
      `/api/vehicles/${id}/upload/${documentType}`,
  },

  DRIVER: {
    LIST: "/api/drivers",

    CREATE: "/api/drivers",

    DETAILS: (id: string) => `/api/drivers/${id}`,

    UPDATE: (id: string) => `/api/drivers/${id}`,

    DELETE: (id: string) => `/api/drivers/${id}`,

    UPLOAD: (id: string) => `/api/drivers/${id}/upload`,
  },

  BOOKING: {
    LIST: "/api/bookings",

    CREATE: "/api/bookings",

    DETAILS: (id: string) => `/api/bookings/${id}`,

    UPDATE: (id: string) => `/api/bookings/${id}`,

    DELETE: (id: string) => `/api/bookings/${id}`,

    ASSIGN: (id: string) => `/api/bookings/${id}/assign`,

    DELIVER: (id: string) => `/api/bookings/${id}/deliver`,
  },
} as const;
