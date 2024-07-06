import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TourSlots } from './tour_slots.entity';


@Injectable()
export class SlotsRepository extends Repository<TourSlots> {
  constructor(private dataSource: DataSource) {
    super(TourSlots, dataSource.createEntityManager());
  }
}
