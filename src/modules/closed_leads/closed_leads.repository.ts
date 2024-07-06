import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ClosedLead } from './entities/closed_lead.entity';

@Injectable()
export class ClosedLeadsRepository extends Repository<ClosedLead> {
  constructor(private dataSource: DataSource) {
    super(ClosedLead, dataSource.createEntityManager());
  }
}
