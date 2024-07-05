import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BrokerReferredLeadsService } from './broker_referred_leads.service';
import { CreateBrokerReferredLeadDto } from './dto/create-broker_referred_lead.dto';

@Controller('broker-referred-leads')
export class BrokerReferredLeadsController {
  constructor(
    private readonly brokerReferredLeadsService: BrokerReferredLeadsService,
  ) {}

  @Post()
  async create(
    @Body() createBrokerReferredLeadDto: CreateBrokerReferredLeadDto,
  ) {
    return await this.brokerReferredLeadsService.upsertOne(
      createBrokerReferredLeadDto,
    );
  }

  @Get()
  async findAll() {
    return await this.brokerReferredLeadsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.brokerReferredLeadsService.findById(+id);
  }
}
