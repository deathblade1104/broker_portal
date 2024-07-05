import { PartialType } from '@nestjs/swagger';
import { CreateClosedLeadDto } from './create-closed_lead.dto';

export class UpdateClosedLeadDto extends PartialType(CreateClosedLeadDto) {}
