import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TourSlotsService } from './tour_slots.service';

@ApiTags('tour-slots')
@Controller('tour-slots')
export class TourSlotsController {
  constructor(private readonly tourSlotsService: TourSlotsService) {}
}
