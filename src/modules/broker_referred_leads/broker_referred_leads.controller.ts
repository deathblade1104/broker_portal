import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrokerReferredLeadsService } from './broker_referred_leads.service';
import { CreateBrokerReferredLeadDto } from './dto/create-broker_referred_lead.dto';
import { UpdateBrokerReferredLeadDto } from './dto/update-broker_referred_lead.dto';

@Controller('broker-referred-leads')
export class BrokerReferredLeadsController {
  constructor(private readonly brokerReferredLeadsService: BrokerReferredLeadsService) {}

  @Post()
  create(@Body() createBrokerReferredLeadDto: CreateBrokerReferredLeadDto) {
    return this.brokerReferredLeadsService.create(createBrokerReferredLeadDto);
  }

  @Get()
  findAll() {
    return this.brokerReferredLeadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brokerReferredLeadsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrokerReferredLeadDto: UpdateBrokerReferredLeadDto) {
    return this.brokerReferredLeadsService.update(+id, updateBrokerReferredLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brokerReferredLeadsService.remove(+id);
  }
}
