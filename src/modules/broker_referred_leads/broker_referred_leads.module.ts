import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrokerReferredLeadsController } from './broker_referred_leads.controller';
import { BrokerReferredLeadsService } from './broker_referred_leads.service';
import { BrokerReferredLeadsRepository } from './broker_referrred_leads.repository';
import { BrokerReferredLead } from './entities/broker_referred_lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BrokerReferredLead])],
  controllers: [BrokerReferredLeadsController],
  providers: [BrokerReferredLeadsService, BrokerReferredLeadsRepository],
  exports: [BrokerReferredLeadsService],
})
export class BrokerReferredLeadsModule {}
