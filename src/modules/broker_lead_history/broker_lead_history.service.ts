import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '../../common/services/baseCrud.service';
import { BrokerLeadHistories } from './broker_lead_histories.entity';
import { BrokerLeadHistoriesRepository } from './broker_lead_history.repository';

@Injectable()
export class BrokerLeadHistoriesService extends BaseCrudService<BrokerLeadHistories> {
  constructor(
    @InjectRepository(BrokerLeadHistoriesRepository)
    private readonly repo: BrokerLeadHistoriesRepository,
  ) {
    super(repo, 'BrokerLeadHistories');
  }

  async getLeadHistories(leadId: number) {
    return await this.findAll({ where: { lead_id: leadId } });
  }
}
