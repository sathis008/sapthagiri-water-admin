export type CollectionMethod = "DRIVER" | "MANAGER" | "OFFICE";

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

  collectionMethod?: CollectionMethod;

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
  collectionMethod?: CollectionMethod;
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

export interface CustomerResponse {
  success: boolean;
  data: Customer;
}
