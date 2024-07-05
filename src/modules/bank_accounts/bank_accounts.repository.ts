import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BankAccount } from './bank_accounts.entity';

@Injectable()
export class BankAccountsRepository extends Repository<BankAccount> {
  constructor(private dataSource: DataSource) {
    super(BankAccount, dataSource.createEntityManager());
  }
}
