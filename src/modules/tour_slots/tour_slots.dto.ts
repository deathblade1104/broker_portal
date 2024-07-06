import { createZodDto } from 'nestjs-zod';
import { CreateTourSlotSchema } from './tour_slots.zod.schema';

export class AvailableTourTime {
  building_id: string;
  service_resource_id: string;
  date: string;
  start_time: string;
  end_time: string;
}

export class AvailableTourTimesResponse {
  available_tour_times: AvailableTourTime[];
}

export class CreateTourSlotDto extends createZodDto(CreateTourSlotSchema) {}
