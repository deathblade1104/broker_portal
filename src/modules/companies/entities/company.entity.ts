import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../../database/postgres/abstract.entity';
import { BankAccount } from '../../bank_accounts/bank_accounts.entity';

@Entity('companies')
export class Company extends AbstractEntity<Company> {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  gstin: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  state: string;

  @Column()
  bank_account_info_id: number;

  @OneToOne(() => BankAccount)
  @JoinColumn({ name: 'bank_account_info_id' })
  bank_account: BankAccount;
}
