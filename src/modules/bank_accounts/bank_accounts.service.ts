import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '../../common/services/baseCrud.service';
import { BankAccount } from './bank_accounts.entity';
import { BankAccountsRepository } from './bank_accounts.repository';

@Injectable()
export class BankAccountsService extends BaseCrudService<BankAccount> {
  constructor(
    @InjectRepository(BankAccountsRepository)
    private readonly repo: BankAccountsRepository,
  ) {
    super(repo, 'BankAccounts');
  }
}
