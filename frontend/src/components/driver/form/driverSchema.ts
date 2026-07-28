import { z } from 'zod';

export const driverSchema = z.object({
  isDriver: z.boolean(),

  name: z.string().trim().min(1, 'Employee name is required'),

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
  assignedVehicleId: z.string().nullable().optional(),
}).superRefine((values, context) => {
  if (values.isDriver && !values.licenseNumber?.trim()) context.addIssue({ code: 'custom', path: ['licenseNumber'], message: 'License number is required for drivers.' });
  if (values.isDriver && !values.licenseExpiry) context.addIssue({ code: 'custom', path: ['licenseExpiry'], message: 'License expiry is required for drivers.' });
});

export type DriverFormValues = z.infer<typeof driverSchema>;
