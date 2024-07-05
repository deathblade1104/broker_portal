import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrokerLeadHistories } from './broker_lead_histories.entity';
import { BrokerLeadHistoriesRepository } from './broker_lead_history.repository';
import { BrokerLeadHistoriesService } from './broker_lead_history.service';

@Module({
  imports: [TypeOrmModule.forFeature([BrokerLeadHistories])],
  providers: [BrokerLeadHistoriesService, BrokerLeadHistoriesRepository],
  exports: [BrokerLeadHistoriesService],
})
export class BrokerLeadHistoryModule {}
