import { z } from 'zod';

export const vehicleSchema = z.object({
  vehicleNumber: z.string().min(1, 'Vehicle Number is required'),

  capacity: z.string().min(1, 'Capacity is required'),

  status: z.enum(['AVAILABLE', 'ON_TRIP', 'MAINTENANCE', 'INACTIVE']),

  manufacturer: z.string().optional(),

  vehicleModel: z.string().optional(),

  year: z.coerce.number().optional(),

  rcNumber: z.string().min(1, 'RC Number is required'),

  rcExpiry: z.string().optional(),

  insuranceCompany: z.string().optional(),

  policyNumber: z.string().optional(),

  insuranceExpiry: z.string().optional(),

  fcNumber: z.string().optional(),

  fcExpiry: z.string().optional(),

  pucNumber: z.string().optional(),

  pucExpiry: z.string().optional(),

  currentKm: z.coerce.number().optional(),

  notes: z.string().optional(),
});

export type VehicleFormValues = z.infer<typeof vehicleSchema>;
