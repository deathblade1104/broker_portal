import { Module } from '@nestjs/common';
import { BrokerFeeBreakupsService } from './broker_fee_breakups.service';
import { BrokerFeeBreakupsController } from './broker_fee_breakups.controller';

@Module({
  controllers: [BrokerFeeBreakupsController],
  providers: [BrokerFeeBreakupsService],
})
export class BrokerFeeBreakupsModule {}
