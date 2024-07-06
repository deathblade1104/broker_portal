import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiCustomResponseArray } from '../../common/decorators/api-response.decorator';
import { ZodPipe } from '../../common/pipes/zod.pipe';
import { CustomResponseBody } from '../../common/providers/customResponse';
import { AvailableTourTime, CreateTourSlotDto } from './tour_slots.dto';
import { TourSlotsService } from './tour_slots.service';
import { CreateTourSlotSchema } from './tour_slots.zod.schema';

@ApiTags('tour-booking')
@Controller('tour-booking')
export class TourSlotsController {
  constructor(private readonly tourSlotsService: TourSlotsService) {}

  @Post('book')
  @UsePipes(new ZodPipe(CreateTourSlotSchema))
  async create(@Body() dto: CreateTourSlotDto) {
    return new CustomResponseBody(
      `Booked a tour slot`,
      await this.tourSlotsService.createTourSlot(dto),
    );
  }

  @Get('slots/available')
  @ApiQuery({ name: 'building_id', required: true })
  @ApiQuery({ name: 'date', required: true })
  @ApiCustomResponseArray(AvailableTourTime)
  async getAvailable(
    @Query('building_id') buildingId: string,
    @Query('date') date: string,
  ) {
    if (!buildingId || !date) {
      throw new BadRequestException(
        'Both building_id and date are required query parameters',
      );
    }
    return new CustomResponseBody(
      `Fetched available time slots`,
      await this.tourSlotsService.getAvailableTourTimes(buildingId, date),
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return new CustomResponseBody(
      `Fetched Tour Booking Slot`,
      await this.tourSlotsService.findById(+id),
    );
  }

  @Get('all/upcoming')
  @ApiQuery({ name: 'broker_id', required: true })
  async getAllBookings(@Query('broker_id') brokerId: string) {
    return new CustomResponseBody(
      `Fetched all time slot bookings`,
      await this.tourSlotsService.findUpcomingTourSlots(+brokerId),
    );
  }

  @Put(':id/completed')
  async completeTour(@Param('id') id: string) {
    return new CustomResponseBody(
      `Marked tour booking with ${id} as completed`,
      await this.tourSlotsService.completeTour(+id),
    );
  }
}
