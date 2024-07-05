import { z } from 'zod';

export const BankAccountSchema = z.object({
  bank_name: z.string().min(1),
  account_holder_name: z.string().min(1),
  account_number: z.string().min(1),
  branch_name: z.string().min(1),
  ifsc_code: z.string().min(1),
});
