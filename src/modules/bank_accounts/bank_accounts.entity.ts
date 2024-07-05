import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../database/postgres/abstract.entity';

@Entity('bank-accounts')
export class BankAccount extends AbstractEntity<BankAccount> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bank_name: string;

  @Column()
  account_holder_name: string;

  @Column()
  account_number: string;

  @Column()
  branch_name: string;

  @Column()
  ifsc_code: string;
}
