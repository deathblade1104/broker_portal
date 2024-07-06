import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../database/postgres/abstract.entity';

@Entity('tour-slots')
export class TourSlots extends AbstractEntity<TourSlots> {
  @Column()
  broker_id: number;

  @Column()
  lead_id: number;

  @Column({ type: 'varchar' })
  building_id: string;

  @Column({ type: 'uuid' })
  uid: string;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @Column({ type: 'boolean', default: false })
  is_completed: boolean;
}
