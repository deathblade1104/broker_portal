import { createZodDto } from 'nestjs-zod';
import { BrokerReferredLeadsSchema } from '../broker_referred_leads.zod.schema';

export class CreateBrokerReferredLeadDto extends createZodDto(
  BrokerReferredLeadsSchema,
) {}
