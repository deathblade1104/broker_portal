import { z } from 'nestjs-zod/z';
import { CompanySchema } from '../companies/companies.zod.schema';

export const UserSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().min(1).email(),
    phone_number: z
      .string()
      .min(1, { message: 'Phone Number is required' })
      .regex(/^\d{10}$/, { message: 'Invalid phone number' }),
    password: z.password(),
    is_admin: z.boolean().default(false),
    company_id: z.number().int().min(1).optional(),
    company: CompanySchema.optional().optional(),
  })
  .strict()
  .refine(
    data => {
      if (!data.company_id && !data.company) {
        return false;
      }

      return true;
    },
    {
      message: 'Either Company Object or company_id should be present.',
      path: ['company_id', 'company'],
    },
  );
