import { createZodDto } from 'nestjs-zod';
import { BankAccount } from '../../bank_accounts/bank_accounts.entity';
import { CompanySchema } from '../companies.zod.schema';
import { Company } from '../entities/company.entity';
// import {
//   CreateChecklistCategoriesSchemaArray,
//   UpdateChecklistCategoriesSchema,
// } from './checklist_categories.zod.schema';
// export class CreateChecklistCategoriesArrayDto extends createZodDto(
//   CreateChecklistCategoriesSchemaArray,
// ) {}

// export class UpdateChecklistCategoryDto extends createZodDto(
//   UpdateChecklistCategoriesSchema,
// ) {}

export class CreateCompanyDto extends createZodDto(CompanySchema) {}

export class CompanyResponseDto extends Company {
  account: BankAccount;
}
