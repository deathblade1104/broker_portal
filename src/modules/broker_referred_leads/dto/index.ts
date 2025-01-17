import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import {
  PaginatedLinks,
  PaginatedMeta,
} from '../../../common/dtos/paginatedResponse.dto';
import { IBuilding } from '../../../services/building/building.interface';
import { BrokerLeadHistories } from '../../broker_lead_history/broker_lead_histories.entity';
import {
  BrokerReferredLeadsSchema,
  UpdateBrokerReferredLeadsSchema,
} from '../broker_referred_leads.zod.schema';
import { BrokerReferredLead } from '../entities/broker_referred_lead.entity';

export class CreateBrokerReferredLeadDto extends createZodDto(
  BrokerReferredLeadsSchema,
) {}

export class UpdateStatusDto extends createZodDto(
  UpdateBrokerReferredLeadsSchema,
) {}

export class LeadWithBuilding extends BrokerReferredLead {
  building?: IBuilding;
  histories?: BrokerLeadHistories[];
}

@ApiExtraModels(PaginatedMeta, PaginatedLinks)
export class LeadsPaginatedResponseDto {
  @ApiProperty()
  paginatedData: LeadWithBuilding[];

  @ApiProperty({ type: () => PaginatedMeta })
  meta: PaginatedMeta;

  @ApiProperty({ type: () => PaginatedLinks })
  links: PaginatedLinks;
}

export class RevenueResult {
  constructor(
    public year_prices: number[],
    public tcv: number,
    public acv: number,
    public brokerage: number,
  ) {}
}
