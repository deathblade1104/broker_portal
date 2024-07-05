import { PartialType } from '@nestjs/swagger';
import { CreateBrokerReferredLeadDto } from './create-broker_referred_lead.dto';

export class UpdateBrokerReferredLeadDto extends PartialType(CreateBrokerReferredLeadDto) {}
