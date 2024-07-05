import { Controller } from '@nestjs/common';
import { BankAccountsService } from './bank_accounts.service';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}
}
