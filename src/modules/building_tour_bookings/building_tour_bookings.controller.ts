import { Controller } from '@nestjs/common';
import { BuildingTourBookingsService } from './building_tour_bookings.service';

@Controller('building-tour-bookings')
export class BuildingTourBookingsController {
  constructor(private readonly buildingTourBookingsService: BuildingTourBookingsService) {}
}
