import { Module } from '@nestjs/common';
import { ClosedLeadsService } from './closed_leads.service';
import { ClosedLeadsController } from './closed_leads.controller';

@Module({
  controllers: [ClosedLeadsController],
  providers: [ClosedLeadsService],
})
export class ClosedLeadsModule {}
