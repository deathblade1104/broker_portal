import { Module } from '@nestjs/common';
import { BuildingTourBookingsService } from './building_tour_bookings.service';
import { BuildingTourBookingsController } from './building_tour_bookings.controller';

@Module({
  controllers: [BuildingTourBookingsController],
  providers: [BuildingTourBookingsService],
})
export class BuildingTourBookingsModule {}
