import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, z } from 'zod';
import { fromError } from 'zod-validation-error';

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodTypeAny) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;
    try {
      this.schema.parse(value);
      return value;
    } catch (e) {
      if (e instanceof ZodError) {
        const validationError = fromError(e);
        throw new BadRequestException(validationError.toString());
      }
      throw e;
    }
  }
}
