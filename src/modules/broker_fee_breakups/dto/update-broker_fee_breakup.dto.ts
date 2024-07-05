import { PartialType } from '@nestjs/swagger';
import { CreateBrokerFeeBreakupDto } from './create-broker_fee_breakup.dto';

export class UpdateBrokerFeeBreakupDto extends PartialType(CreateBrokerFeeBreakupDto) {}
