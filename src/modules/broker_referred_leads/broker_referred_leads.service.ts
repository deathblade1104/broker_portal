import { Injectable } from '@nestjs/common';
import { CreateBrokerReferredLeadDto } from './dto/create-broker_referred_lead.dto';
import { UpdateBrokerReferredLeadDto } from './dto/update-broker_referred_lead.dto';

@Injectable()
export class BrokerReferredLeadsService {
  create(createBrokerReferredLeadDto: CreateBrokerReferredLeadDto) {
    return 'This action adds a new brokerReferredLead';
  }

  findAll() {
    return `This action returns all brokerReferredLeads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brokerReferredLead`;
  }

  update(id: number, updateBrokerReferredLeadDto: UpdateBrokerReferredLeadDto) {
    return `This action updates a #${id} brokerReferredLead`;
  }

  remove(id: number) {
    return `This action removes a #${id} brokerReferredLead`;
  }
}
