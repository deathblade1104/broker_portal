import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClosedLeadsRepository } from './closed_leads.repository';
import { ClosedLeadsService } from './closed_leads.service';
import { ClosedLead } from './entities/closed_lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClosedLead])],
  providers: [ClosedLeadsService, ClosedLeadsRepository],
  exports: [ClosedLeadsService],
})
export class ClosedLeadsModule {}
