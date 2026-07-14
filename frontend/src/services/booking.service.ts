import api from "@/api/axios";

import { API_ENDPOINTS } from "@/api/endpoints";

import type { ApiResponse } from "@/types/api";

import type {
  Booking,
  BookingListResponse,
  CreateBookingRequest,
  UpdateBookingRequest,
  AssignBookingRequest,
  CompleteDeliveryRequest,
} from "@/types/booking";

class BookingService {
  /**
   * Get All Bookings
   */
  async getBookings(
    params?: Record<string, unknown>,
  ): Promise<BookingListResponse> {
    const response = await api.get<BookingListResponse>(
      API_ENDPOINTS.BOOKING.LIST,
      {
        params,
      },
    );

    return response.data;
  }
  /**
   * Get Booking By Id
   */
  async getBookingById(id: string): Promise<Booking> {
    const response = await api.get<ApiResponse<Booking>>(
      API_ENDPOINTS.BOOKING.DETAILS(id),
    );

    return response.data.data;
  }

  /**
   * Create Booking
   */
  async createBooking(payload: CreateBookingRequest): Promise<Booking> {
    const response = await api.post<ApiResponse<Booking>>(
      API_ENDPOINTS.BOOKING.CREATE,
      payload,
    );

    return response.data.data;
  }

  /**
   * Update Booking
   */
  async updateBooking(
    id: string,
    payload: UpdateBookingRequest,
  ): Promise<Booking> {
    const response = await api.put<ApiResponse<Booking>>(
      API_ENDPOINTS.BOOKING.UPDATE(id),
      payload,
    );

    return response.data.data;
  }

  /**
   * Delete Booking
   */
  async deleteBooking(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.BOOKING.DELETE(id));
  }

  /**
   * Assign Booking
   */
  async assignBooking(
    id: string,
    payload: AssignBookingRequest,
  ): Promise<Booking> {
    const response = await api.put<ApiResponse<Booking>>(
      API_ENDPOINTS.BOOKING.ASSIGN(id),
      payload,
    );

    return response.data.data;
  }

  /**
   * Complete Delivery
   */
  async completeDelivery(
    id: string,
    payload: CompleteDeliveryRequest,
  ): Promise<Booking> {
    const response = await api.put<ApiResponse<Booking>>(
      API_ENDPOINTS.BOOKING.DELIVER(id),
      payload,
    );

    return response.data.data;
  }

  /**
   * Get Pending Bookings By Customer
   */
  async getPendingBookingsByCustomer(customerId: string): Promise<Booking[]> {
    const response = await api.get<ApiResponse<Booking[]>>(
      API_ENDPOINTS.BOOKING.PENDING(customerId),
    );

    return response.data.data;
  }
}

export default new BookingService();
