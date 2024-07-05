import { z } from 'zod';
import { BankAccountSchema } from '../bank_accounts/bank_accounts.zod.schema';

export const CompanySchema = z
  .object({
    name: z.string().min(1).max(100),
    gstin: z.string().min(1).max(100),
    city: z.string().min(1).max(100),
    state: z.string().min(1).max(100),
    account_info: BankAccountSchema,
  })
  .strict();
