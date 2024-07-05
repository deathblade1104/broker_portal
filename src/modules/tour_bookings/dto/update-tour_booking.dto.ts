import { PartialType } from '@nestjs/swagger';
import { CreateTourBookingDto } from './create-tour_booking.dto';

export class UpdateTourBookingDto extends PartialType(CreateTourBookingDto) {}
