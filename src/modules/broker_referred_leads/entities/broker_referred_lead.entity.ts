import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../database/postgres/abstract.entity';
import { User } from '../../users/entities/user.entity';
import { BrokerReferredLeadStatus } from '../broker_referred_leads.enum';

@Entity('broker-referred-leads')
export class BrokerReferredLead extends AbstractEntity<BrokerReferredLead> {
  @Column({ nullable: true })
  client_name: string;

  @Column({ type: 'timestamp' })
  target_move_in_date: Date;

  @Column()
  no_of_desks: number;

  @Column()
  tenure_in_months: number;

  @Column({ type: 'varchar' })
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

  @Column({
    type: 'enum',
    enum: BrokerReferredLeadStatus,
    default: BrokerReferredLeadStatus.LEAD_SUBMITTED,
  })
  status: BrokerReferredLeadStatus;

  @Column({ type: 'text' })
  city: string;

  @Column({ nullable: true })
  micro_market: string;

  @Column({ type: 'timestamp', nullable: true })
  closed_at: Date;
}
