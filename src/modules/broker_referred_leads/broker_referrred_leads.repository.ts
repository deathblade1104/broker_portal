import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BrokerReferredLead } from './entities/broker_referred_lead.entity';

@Injectable()
export class BrokerReferredLeadsRepository extends Repository<BrokerReferredLead> {
  constructor(private dataSource: DataSource) {
    super(BrokerReferredLead, dataSource.createEntityManager());
  }
}
