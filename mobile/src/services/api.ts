import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { sessionStorage } from './storage';
import { sessionEvents } from './sessionEvents';
import type { ApiResponse, Booking, BookingPayload, Customer, CustomerPayload, Dashboard, Driver, Session, Vehicle } from '../types';

const rawBaseQuery = fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:5000', prepareHeaders: async (headers) => { const session = await sessionStorage.get(); if (session?.token) headers.set('authorization', `Bearer ${session.token}`); headers.set('content-type', 'application/json'); return headers; } });
const baseQuery: typeof rawBaseQuery = async (args, api, extra) => { const result = await rawBaseQuery(args, api, extra); if (result.error?.status === 401) { await sessionStorage.clear(); sessionEvents.unauthorized(); } return result; };
export const api = createApi({ reducerPath: 'api', baseQuery, tagTypes: ['Customer', 'Booking', 'Dashboard'], endpoints: (build) => ({
  login: build.mutation<Session, { email: string; password: string }>({ query: (body) => ({ url: '/api/auth/login', method: 'POST', body }), transformResponse: (response: ApiResponse<Session>) => response.data }),
  dashboard: build.query<Dashboard, void>({ query: () => '/api/dashboard', transformResponse: (r: ApiResponse<Dashboard>) => r.data, providesTags: ['Dashboard'] }),
  customers: build.query<ApiResponse<Customer[]>, { page?: number; limit?: number; search?: string; status?: string } | void>({ query: (params) => ({ url: '/api/customers', params: params || undefined }), providesTags: ['Customer'] }),
  customer: build.query<Customer, string>({ query: (id) => `/api/customers/${id}`, transformResponse: (r: ApiResponse<Customer>) => r.data, providesTags: (_, __, id) => [{ type: 'Customer', id }] }),
  createCustomer: build.mutation<Customer, CustomerPayload>({ query: (body) => ({ url: '/api/customers', method: 'POST', body }), transformResponse: (r: ApiResponse<Customer>) => r.data, invalidatesTags: ['Customer', 'Dashboard'] }),
  updateCustomer: build.mutation<Customer, { id: string; body: Partial<CustomerPayload> }>({ query: ({ id, body }) => ({ url: `/api/customers/${id}`, method: 'PUT', body }), transformResponse: (r: ApiResponse<Customer>) => r.data, invalidatesTags: ['Customer'] }),
  bookings: build.query<ApiResponse<Booking[]>, { page?: number; limit?: number; search?: string; status?: string } | void>({ query: (params) => ({ url: '/api/bookings', params: params || undefined }), providesTags: ['Booking'] }),
  booking: build.query<Booking, string>({ query: (id) => `/api/bookings/${id}`, transformResponse: (r: ApiResponse<Booking>) => r.data, providesTags: (_, __, id) => [{ type: 'Booking', id }] }),
  createBooking: build.mutation<Booking, BookingPayload>({ query: (body) => ({ url: '/api/bookings', method: 'POST', body }), transformResponse: (r: ApiResponse<Booking>) => r.data, invalidatesTags: ['Booking', 'Dashboard'] }),
  updateBooking: build.mutation<Booking, { id: string; body: BookingPayload }>({ query: ({ id, body }) => ({ url: `/api/bookings/${id}`, method: 'PUT', body }), transformResponse: (r: ApiResponse<Booking>) => r.data, invalidatesTags: ['Booking', 'Dashboard'] }),
  drivers: build.query<Driver[], void>({ query: () => '/api/drivers', transformResponse: (r: ApiResponse<Driver[]>) => r.data }),
  vehicles: build.query<Vehicle[], void>({ query: () => '/api/vehicles', transformResponse: (r: ApiResponse<Vehicle[]>) => r.data }),
  assignBooking: build.mutation<Booking, { id: string; driverId: string; vehicleId: string; notes?: string }>({ query: ({ id, ...body }) => ({ url: `/api/bookings/${id}/assign`, method: 'PUT', body }), transformResponse: (r: ApiResponse<Booking>) => r.data, invalidatesTags: ['Booking', 'Dashboard'] })
}) });
export const { useLoginMutation, useDashboardQuery, useCustomersQuery, useCustomerQuery, useCreateCustomerMutation, useUpdateCustomerMutation, useBookingsQuery, useBookingQuery, useCreateBookingMutation, useUpdateBookingMutation, useDriversQuery, useVehiclesQuery, useAssignBookingMutation } = api;
