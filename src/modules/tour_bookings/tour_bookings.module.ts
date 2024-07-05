import { Module } from '@nestjs/common';
import { TourBookingsService } from './tour_bookings.service';
import { TourBookingsController } from './tour_bookings.controller';

@Module({
  controllers: [TourBookingsController],
  providers: [TourBookingsService],
})
export class TourBookingsModule {}
