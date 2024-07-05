import { createZodDto } from 'nestjs-zod';
import { IBuilding } from '../../../services/building/building.interface';
import { BrokerReferredLeadsSchema } from '../broker_referred_leads.zod.schema';
import { BrokerReferredLead } from '../entities/broker_referred_lead.entity';

export class CreateBrokerReferredLeadDto extends createZodDto(
  BrokerReferredLeadsSchema,
) {}

export class LeadWithBuilding extends BrokerReferredLead {
  building?: IBuilding;
}
