import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

const carSchema = z.object({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export type Car = z.infer<typeof carSchema> & Vehicle;