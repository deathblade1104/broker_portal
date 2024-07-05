import { Injectable } from '@nestjs/common';
import { CreateBrokerFeeBreakupDto } from './dto/create-broker_fee_breakup.dto';
import { UpdateBrokerFeeBreakupDto } from './dto/update-broker_fee_breakup.dto';

@Injectable()
export class BrokerFeeBreakupsService {
  create(createBrokerFeeBreakupDto: CreateBrokerFeeBreakupDto) {
    return 'This action adds a new brokerFeeBreakup';
  }

  findAll() {
    return `This action returns all brokerFeeBreakups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brokerFeeBreakup`;
  }

  update(id: number, updateBrokerFeeBreakupDto: UpdateBrokerFeeBreakupDto) {
    return `This action updates a #${id} brokerFeeBreakup`;
  }

  remove(id: number) {
    return `This action removes a #${id} brokerFeeBreakup`;
  }
}
