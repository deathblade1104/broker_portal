import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '../../common/services/baseCrud.service';
import { BrokerReferredLeadsRepository } from './broker_referrred_leads.repository';
import { BrokerReferredLead } from './entities/broker_referred_lead.entity';

@Injectable()
export class BrokerReferredLeadsService extends BaseCrudService<BrokerReferredLead> {
  constructor(
    @InjectRepository(BrokerReferredLeadsRepository)
    private readonly repo: BrokerReferredLeadsRepository,
  ) {
    super(repo, 'BrokerReferredLeads');
  }
}
