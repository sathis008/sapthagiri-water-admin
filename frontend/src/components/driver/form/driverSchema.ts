import { z } from 'zod';

export const driverSchema = z.object({
  name: z.string().trim().min(1, 'Driver name is required'),

  phone: z
    .string()
    .trim()
    .min(10, 'Mobile number is required')
    .max(10, 'Mobile number must be 10 digits'),

  alternatePhone: z.string().optional(),

  address: z.string().optional(),

  licenseNumber: z.string().optional(),

  licenseExpiry: z.string().optional(),

  notes: z.string().optional(),

  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export type DriverFormValues = z.infer<typeof driverSchema>;
