import { Injectable } from '@nestjs/common';
import { CreateClosedLeadDto } from './dto/create-closed_lead.dto';
import { UpdateClosedLeadDto } from './dto/update-closed_lead.dto';

@Injectable()
export class ClosedLeadsService {
  create(createClosedLeadDto: CreateClosedLeadDto) {
    return 'This action adds a new closedLead';
  }

  findAll() {
    return `This action returns all closedLeads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} closedLead`;
  }

  update(id: number, updateClosedLeadDto: UpdateClosedLeadDto) {
    return `This action updates a #${id} closedLead`;
  }

  remove(id: number) {
    return `This action removes a #${id} closedLead`;
  }
}
