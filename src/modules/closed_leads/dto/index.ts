import { createZodDto } from 'nestjs-zod';
import { ClosedLeadSchema } from '../closed_lead.zod.schema';

export class CreateClosedLeadDto extends createZodDto(ClosedLeadSchema) {}
