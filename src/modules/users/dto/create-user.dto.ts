import { createZodDto } from 'nestjs-zod';
import { SignUpUserSchema } from '../users.zod.schema';

export class SignUpUserDto extends createZodDto(SignUpUserSchema) {}
