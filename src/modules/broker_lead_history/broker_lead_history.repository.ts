import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BrokerLeadHistories } from './broker_lead_histories.entity';

@Injectable()
export class BrokerLeadHistoriesRepository extends Repository<BrokerLeadHistories> {
  constructor(private dataSource: DataSource) {
    super(BrokerLeadHistories, dataSource.createEntityManager());
  }
}
