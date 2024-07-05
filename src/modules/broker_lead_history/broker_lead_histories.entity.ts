import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../database/postgres/abstract.entity';
import { BrokerReferredLeadStatus } from '../broker_referred_leads/broker_referred_leads.enum';
import { BrokerReferredLead } from '../broker_referred_leads/entities/broker_referred_lead.entity';

@Entity('broker_lead_history')
export class BrokerLeadHistories extends AbstractEntity<BrokerLeadHistories> {
  @Column()
  lead_id: number;

  @ManyToOne(() => BrokerReferredLead)
  @JoinColumn({ name: 'lead_id' })
  lead: BrokerReferredLead;

  @Column({
    type: 'enum',
    enum: BrokerReferredLeadStatus,
  })
  status: BrokerReferredLeadStatus;
}
