export type Role = 'ADMIN' | 'MANAGER' | string;
export interface User { id: string; name: string; email: string; role: Role }
export interface Session { token: string; user: User }
export interface Pagination { page: number; limit: number; total: number; totalPages: number }
export type CollectionMethod = 'DRIVER' | 'MANAGER' | 'OFFICE';
export interface Customer { _id: string; name: string; phone: string; alternatePhone?: string; address: string; area?: string; city?: string; pincode?: string; landmark?: string; capacity?: string; price?: number; status: 'ACTIVE' | 'INACTIVE'; collectionMethod?: CollectionMethod; notes?: string; createdAt: string; updatedAt: string }
export type CustomerPayload = Omit<Customer, '_id' | 'createdAt' | 'updatedAt'>;
export type BookingStatus = 'CONFIRMED' | 'ASSIGNED' | 'DELIVERED' | 'CANCELLED';
export interface Booking { _id: string; bookingNumber: string; customerId: string; customerName: string; phone: string; address: string; capacity: number; price: number; bookingDate: string; status: BookingStatus; paymentStatus: 'PENDING' | 'PAID'; collectionMethod?: CollectionMethod; vehicleId?: string; vehicleNumber?: string; driverId?: string; driverName?: string; notes?: string; createdAt: string; updatedAt: string }
export interface Driver { _id: string; name: string; phone: string; status: 'ACTIVE' | 'INACTIVE'; isDriver: boolean }
export interface Vehicle { _id: string; vehicleNumber: string; capacity: string; status: 'AVAILABLE' | 'ON_TRIP' | 'MAINTENANCE' | 'INACTIVE' }
export interface BookingPayload { customerId: string; capacity: number; price: number; bookingDate: string; notes?: string; status?: BookingStatus; driverId?: string; vehicleId?: string; collectionMethod?: CollectionMethod; }
export interface ApiResponse<T> { success: boolean; message?: string; data: T; pagination?: Pagination }
export interface Dashboard { summary: { todayBookings: number; todayDeliveries: number; pendingCollections: number; todayRevenue: number }; recentBookings?: Booking[] }
