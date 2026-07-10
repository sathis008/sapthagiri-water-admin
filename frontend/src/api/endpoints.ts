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
    CUSTOMER_OPTIONS: "/api/customers/options",
  },

  VEHICLE: {
    LIST: "/api/vehicles",
    CREATE: "/api/vehicles",
    DETAILS: (id: string) => `/api/vehicles/${id}`,
    UPDATE: (id: string) => `/api/vehicles/${id}`,
    DELETE: (id: string) => `/api/vehicles/${id}`,
    UPLOAD: (id: string, documentType: string) =>
      `/api/vehicles/${id}/upload/${documentType}`,

    VEHICLE_OPTIONS: "/api/vehicles/options",
  },

  DRIVER: {
    LIST: "/api/drivers",

    CREATE: "/api/drivers",

    DETAILS: (id: string) => `/api/drivers/${id}`,

    UPDATE: (id: string) => `/api/drivers/${id}`,

    DELETE: (id: string) => `/api/drivers/${id}`,

    UPLOAD: (id: string) => `/api/drivers/${id}/upload`,

    DRIVER_OPTIONS: "/api/drivers/options",
  },

  BOOKING: {
    LIST: "/api/bookings",

    CREATE: "/api/bookings",

    DETAILS: (id: string) => `/api/bookings/${id}`,

    UPDATE: (id: string) => `/api/bookings/${id}`,

    DELETE: (id: string) => `/api/bookings/${id}`,

    ASSIGN: (id: string) => `/api/bookings/${id}/assign`,

    DELIVER: (id: string) => `/api/bookings/${id}/deliver`,

    PENDING: (customerId: string) =>
      `/api/bookings/customer/${customerId}/pending`,
  },

  PAYMENT: {
    LIST: "/api/payments",

    CREATE: "/api/payments",

    DETAILS: (id: string) => `/api/payments/${id}`,

    DELETE: (id: string) => `/api/payments/${id}`,
  },

  DASHBOARD: {
    SUMMARY: "/api/dashboard",
  },

  REPORT: {
    /**
     * Booking Report
     */
    BOOKINGS: "/api/reports/bookings",
    BOOKING_EXCEL: "/api/reports/bookings/export/excel",
    BOOKING_PDF: "/api/reports/bookings/export/pdf",

    /**
     * Payment Report
     */
    PAYMENTS: "/api/reports/payments",
    PAYMENT_EXCEL: "/api/reports/payments/export/excel",
    PAYMENT_PDF: "/api/reports/payments/export/pdf",

    /**
     * Customer Ledger
     */
    CUSTOMER_LEDGER: (customerId: string) =>
      `/api/reports/customer-ledger/${customerId}`,

    CUSTOMER_LEDGER_EXCEL: (customerId: string) =>
      `/api/reports/customer-ledger/${customerId}/export/excel`,

    CUSTOMER_LEDGER_PDF: (customerId: string) =>
      `/api/reports/customer-ledger/${customerId}/export/pdf`,

    /**
     * Driver Settlement
     */
    DRIVER_SETTLEMENT: "/api/reports/driver-settlement",

    DRIVER_SETTLEMENT_EXCEL: "/api/reports/driver-settlement/export/excel",

    DRIVER_SETTLEMENT_PDF: "/api/reports/driver-settlement/export/pdf",

    /**
     * Daily Collection
     */
    DAILY_COLLECTION: "/api/reports/daily-collection",

    DAILY_COLLECTION_EXCEL: "/api/reports/daily-collection/export/excel",

    DAILY_COLLECTION_PDF: "/api/reports/daily-collection/export/pdf",
  },
} as const;
