import { z } from 'nestjs-zod/z';
import { mongoIdSchema } from '../broker_referred_leads/broker_referred_leads.zod.schema';

export const CreateTourSlotSchema = z.object({
  broker_id: z.number().int().min(1),
  lead_id: z.number().int().min(1),
  building_id: mongoIdSchema,
  start_time: z.dateString().future(),
});
