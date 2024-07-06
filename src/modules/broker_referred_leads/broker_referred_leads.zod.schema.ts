import { z } from 'nestjs-zod/z';
import { BrokerReferredLeadStatus } from './broker_referred_leads.enum';

export const mongoIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: 'Invalid MongoDB ObjectId',
});

export const BrokerReferredLeadsSchema = z.object({
  client_name: z.string().optional(),
  target_move_in_date: z.dateString().future(),
  no_of_desks: z.number().int().min(1),
  tenure_in_months: z.number().int().min(1).max(60),
  building_id: mongoIdSchema.optional(),
  broker_id: z.number().int().min(1),
  budget_per_desk: z.number().int().min(1),
  city: z.string().min(1),
});

export const UpdateBrokerReferredLeadsSchema = z.object({
  status: z.nativeEnum(BrokerReferredLeadStatus),
  invoice_url: z.string().url().optional(),
});
