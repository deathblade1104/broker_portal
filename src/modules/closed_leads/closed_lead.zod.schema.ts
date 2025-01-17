import { z } from 'nestjs-zod/z';

export const ClosedLeadSchema = z
  .object({
    lead_id: z.number().int().min(1),
    broker_id: z.number().int().min(1),
    no_of_desks: z.number().int().positive(),
    price_per_desk: z.number().int().positive(),
    move_in_date: z.coerce.date(),
    tenure: z.number().int().positive(),
  })
  .strict();
