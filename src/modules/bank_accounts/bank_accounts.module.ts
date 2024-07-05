import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from './bank_accounts.entity';
import { BankAccountsRepository } from './bank_accounts.repository';
import { BankAccountsService } from './bank_accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount])],
  providers: [BankAccountsService, BankAccountsRepository],
  exports: [BankAccountsService],
})
export class BankAccountsModule {}
