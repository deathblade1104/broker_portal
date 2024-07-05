import { Module } from '@nestjs/common';
import { TourSlotsController } from './tour_slots.controller';
import { TourSlotsService } from './tour_slots.service';

@Module({
  controllers: [TourSlotsController],
  providers: [TourSlotsService],
})
export class SlotsModule {}
