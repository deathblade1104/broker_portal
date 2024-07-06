import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '../../common/services/baseCrud.service';
import { RevenueResult } from '../broker_referred_leads/dto';
import { ClosedLeadsRepository } from './closed_leads.repository';
import { CreateClosedLeadDto } from './dto';
import { ClosedLead } from './entities/closed_lead.entity';

@Injectable()
export class ClosedLeadsService extends BaseCrudService<ClosedLead> {
  constructor(
    @InjectRepository(ClosedLeadsRepository)
    private readonly repo: ClosedLeadsRepository,
  ) {
    super(repo, 'ClosedLeads');
  }

  async createClosedLead(
    dto: CreateClosedLeadDto,
    revenue: RevenueResult,
  ): Promise<ClosedLead> {
    const closedLead = await this.upsertOne({
      ...dto,
      tcv: revenue.tcv,
      earnings: revenue.brokerage,
      acv: revenue.acv,
    });

    return closedLead;
  }
}
