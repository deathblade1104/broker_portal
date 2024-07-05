import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BrokerReferredLeadStatus } from '../broker_referred_leads.enum';

@Entity('broker-referred-leads')
export class BrokerReferredLead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  client_name: string;

  @Column({ type: 'timestamp' })
  target_move_in_date: Date;

  @Column()
  no_of_desks: number;

  @Column()
  tenure: number;

  @Column()
  building_id: string;

  // @ManyToOne(() => Building, { nullable: true })
  // @JoinColumn({ name: 'building_id' })
  // building: Building;

  @Column()
  budget_per_desk: number;

  @Column({ nullable: true, type: 'text' })
  invoice_url: string | null;

  @Column()
  broker_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'broker_id' })
  broker: User;

  @Column()
  projected_earnings: number;

  @Column({
    type: 'enum',
    enum: BrokerReferredLeadStatus,
    default: BrokerReferredLeadStatus.LEAD_SUBMITTED,
  })
  status: BrokerReferredLeadStatus;

  @Column()
  city: string;

  @Column({ nullable: true })
  micro_market: string;

  @Column({ type: 'timestamp', nullable: true })
  closed_at: Date;
}
