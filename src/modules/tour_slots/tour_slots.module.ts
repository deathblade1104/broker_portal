import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingModule } from '../../services/building/building.module';
import { BrokerReferredLeadsModule } from '../broker_referred_leads/broker_referred_leads.module';
import { TourSlotsController } from './tour_slots.controller';
import { TourSlots } from './tour_slots.entity';
import { SlotsRepository } from './tour_slots.repository';
import { TourSlotsService } from './tour_slots.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TourSlots]),
    BrokerReferredLeadsModule,
    BuildingModule,
  ],
  controllers: [TourSlotsController],
  providers: [TourSlotsService, SlotsRepository],
  exports: [TourSlotsService],
})
export class SlotsModule {}
