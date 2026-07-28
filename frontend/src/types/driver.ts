export interface Driver {
  _id: string;
  isDriver: boolean;

  name: string;

  phone: string;

  alternatePhone?: string;

  address?: string;

  licenseNumber?: string;

  licenseExpiry?: string;

  licenseDocument?: string;
  assignedVehicleId?: string | { _id: string; vehicleNumber: string } | null;

  notes?: string;

  status: "ACTIVE" | "INACTIVE";

  createdAt: string;

  updatedAt: string;
}

export interface CreateDriverRequest {
  isDriver: boolean;
  name: string;

  phone: string;

  alternatePhone?: string;

  address?: string;

  licenseNumber?: string;

  licenseExpiry?: string;

  notes?: string;
  assignedVehicleId?: string | null;
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
export interface DriverResponse {
  success: boolean;
  data: Driver;
}
