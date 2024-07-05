import { z } from 'nestjs-zod/z';

export const loginRequestDtoSchema = z.object({
  email: z.string().email(),
  password: z.password(),
});
