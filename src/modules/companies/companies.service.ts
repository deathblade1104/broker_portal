import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '../../common/services/baseCrud.service';
import { BankAccountsService } from '../bank_accounts/bank_accounts.service';
import { CompaniesRepository } from './companies.repository';
import { CompanyResponseDto, CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService extends BaseCrudService<Company> {
  constructor(
    @InjectRepository(CompaniesRepository)
    private readonly repo: CompaniesRepository,
    private readonly bankAccountsService: BankAccountsService,
  ) {
    super(repo, 'Companies');
  }

  async createCompany(dto: CreateCompanyDto): Promise<CompanyResponseDto> {
    const currAccount = await this.bankAccountsService.upsertOne(
      dto.account_info,
    );

    const currCompany = await this.upsertOne({
      ...dto,
      bank_account_info_id: currAccount.id,
    });

    return await this.getCompanyWithAccount(currCompany.id);
  }

  async getCompanyWithAccount(id: number): Promise<CompanyResponseDto> {
    const currCompany = await this.findById(id);
    const currAccount = await this.bankAccountsService.findById(
      currCompany.bank_account_info_id,
    );

    return { ...currCompany, account: currAccount };
  }
}
