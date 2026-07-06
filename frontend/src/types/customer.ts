export interface Customer {
  _id: string;

  name: string;
  phone: string;

  alternatePhone?: string;

  address: string;

  area?: string;
  city?: string;
  pincode?: string;
  landmark?: string;

  capacity?: string;
  price?: number;

  status: "ACTIVE" | "INACTIVE";

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerRequest {
  name: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  area?: string;
  city?: string;
  pincode?: string;
  landmark?: string;
  capacity?: string;
  price?: number;
  status?: "ACTIVE" | "INACTIVE";
  notes?: string;
}

export type UpdateCustomerRequest = CreateCustomerRequest;
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface CustomerListResponse {
  success: boolean;
  data: Customer[];
  pagination: Pagination;
}
