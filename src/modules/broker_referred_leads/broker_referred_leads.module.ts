import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingModule } from '../../services/building/building.module';
import { BrokerLeadHistoryModule } from '../broker_lead_history/broker_lead_history.module';
import { ClosedLeadsModule } from '../closed_leads/closed_leads.module';
import { UsersModule } from '../users/users.module';
import { BrokerReferredLeadsController } from './broker_referred_leads.controller';
import { BrokerReferredLeadsService } from './broker_referred_leads.service';
import { BrokerReferredLeadsRepository } from './broker_referrred_leads.repository';
import { BrokerReferredLead } from './entities/broker_referred_lead.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BrokerReferredLead]),
    BuildingModule,
    BrokerLeadHistoryModule,
    UsersModule,
    ClosedLeadsModule,
  ],
  controllers: [BrokerReferredLeadsController],
  providers: [BrokerReferredLeadsService, BrokerReferredLeadsRepository],
  exports: [BrokerReferredLeadsService], // Export FeeCalculator here
})
export class BrokerReferredLeadsModule {}
