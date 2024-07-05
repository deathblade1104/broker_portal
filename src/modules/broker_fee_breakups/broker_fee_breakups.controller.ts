import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrokerFeeBreakupsService } from './broker_fee_breakups.service';
import { CreateBrokerFeeBreakupDto } from './dto/create-broker_fee_breakup.dto';
import { UpdateBrokerFeeBreakupDto } from './dto/update-broker_fee_breakup.dto';

@Controller('broker-fee-breakups')
export class BrokerFeeBreakupsController {
  constructor(private readonly brokerFeeBreakupsService: BrokerFeeBreakupsService) {}

  @Post()
  create(@Body() createBrokerFeeBreakupDto: CreateBrokerFeeBreakupDto) {
    return this.brokerFeeBreakupsService.create(createBrokerFeeBreakupDto);
  }

  @Get()
  findAll() {
    return this.brokerFeeBreakupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brokerFeeBreakupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrokerFeeBreakupDto: UpdateBrokerFeeBreakupDto) {
    return this.brokerFeeBreakupsService.update(+id, updateBrokerFeeBreakupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brokerFeeBreakupsService.remove(+id);
  }
}
