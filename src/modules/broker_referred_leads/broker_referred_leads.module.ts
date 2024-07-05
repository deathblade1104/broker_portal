import { Module } from '@nestjs/common';
import { BrokerReferredLeadsService } from './broker_referred_leads.service';
import { BrokerReferredLeadsController } from './broker_referred_leads.controller';

@Module({
  controllers: [BrokerReferredLeadsController],
  providers: [BrokerReferredLeadsService],
})
export class BrokerReferredLeadsModule {}
