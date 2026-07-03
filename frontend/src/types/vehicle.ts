export type VehicleStatus = 'AVAILABLE' | 'ON_TRIP' | 'MAINTENANCE' | 'INACTIVE';

export interface IFileDocument {
  fileName?: string;
  fileUrl?: string;
  mimeType?: string;
  fileSize?: number;
  uploadedAt?: string;
}

export interface Vehicle {
  _id: string;

  vehicleNumber: string;

  capacity: string;

  status: VehicleStatus;

  manufacturer?: string;

  vehicleModel?: string;

  year?: number;

  rcNumber: string;

  rcExpiry?: string;

  insuranceCompany?: string;

  policyNumber?: string;

  insuranceExpiry?: string;

  fcNumber?: string;

  fcExpiry?: string;

  pucNumber?: string;

  pucExpiry?: string;

  currentKm?: number;

  notes?: string;

  documents?: {
    rc?: IFileDocument;

    insurance?: IFileDocument;

    fc?: IFileDocument;

    puc?: IFileDocument;
  };

  createdAt: string;

  updatedAt: string;
}

export type CreateVehicleRequest = Omit<Vehicle, '_id' | 'createdAt' | 'updatedAt'>;

export type UpdateVehicleRequest = CreateVehicleRequest;

export interface VehicleListResponse {
  success: boolean;

  data: Vehicle[];
}
