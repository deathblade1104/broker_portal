import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../../database/postgres/abstract.entity';
import { BrokerReferredLead } from '../../broker_referred_leads/entities/broker_referred_lead.entity';
import { User } from '../../users/entities/user.entity';

@Entity('closed_leads')
export class ClosedLead extends AbstractEntity<ClosedLead> {
  @Column()
  lead_id: number;

  @OneToOne(() => BrokerReferredLead)
  @JoinColumn({ name: 'lead_id' })
  lead: BrokerReferredLead;

  @Column()
  broker_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'broker_id' })
  broker: User;

  @Column()
  no_of_desks: number;

  @Column()
  price_per_desk: number;

  @Column()
  move_in_date: number;

  @Column()
  tenure: number;

  @Column()
  tcv: number;

  @Column()
  acv: number;

  @Column()
  earnings: number;
}
