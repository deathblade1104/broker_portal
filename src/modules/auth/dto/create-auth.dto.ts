import { createZodDto } from 'nestjs-zod';
import { loginRequestDtoSchema } from '../auth.zod.schema';

export class loginDto {
  access_token: string;
}

export class LoginResponseDto extends createZodDto(loginRequestDtoSchema) {}
