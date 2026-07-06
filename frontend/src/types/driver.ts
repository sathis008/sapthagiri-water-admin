export interface Driver {
  _id: string;

  name: string;

  phone: string;

  alternatePhone?: string;

  address?: string;

  licenseNumber?: string;

  licenseExpiry?: string;

  licenseDocument?: string;

  notes?: string;

  status: "ACTIVE" | "INACTIVE";

  createdAt: string;

  updatedAt: string;
}

export interface CreateDriverRequest {
  name: string;

  phone: string;

  alternatePhone?: string;

  address?: string;

  licenseNumber?: string;

  licenseExpiry?: string;

  notes?: string;
}

export interface UpdateDriverRequest extends CreateDriverRequest {
  status?: "ACTIVE" | "INACTIVE";
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface DriverListResponse {
  success: boolean;
  data: Driver[];
  pagination: Pagination;
}
