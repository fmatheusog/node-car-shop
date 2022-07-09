import { z } from 'zod';

const vehicleSchema = z.object({
  model: z.string().min(3),
  year: z.number().int().min(1900).max(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type Vehicle = z.infer<typeof vehicleSchema>;
