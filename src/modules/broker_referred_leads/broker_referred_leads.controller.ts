import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ZodPipe } from '../../common/pipes/zod.pipe';
import { CustomResponseBody } from '../../common/providers/customResponse';
import { BrokerReferredLeadsService } from './broker_referred_leads.service';
import { BrokerReferredLeadsSchema } from './broker_referred_leads.zod.schema';
import { CreateBrokerReferredLeadDto } from './dto/create-broker_referred_lead.dto';

@ApiTags('broker-referred-leads')
@Controller('broker-referred-leads')
export class BrokerReferredLeadsController {
  constructor(
    private readonly brokerReferredLeadsService: BrokerReferredLeadsService,
  ) {}

  @Post()
  @UsePipes(new ZodPipe(BrokerReferredLeadsSchema))
  async create(
    @Body() createBrokerReferredLeadDto: CreateBrokerReferredLeadDto,
  ) {
    return new CustomResponseBody(
      'Lead Created Successfully',
      await this.brokerReferredLeadsService.createLead(
        createBrokerReferredLeadDto,
      ),
    );
  }

  @Get()
  async findAll() {
    return new CustomResponseBody(
      'Leads Fetched Successfully',
      await this.brokerReferredLeadsService.findAll(),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new CustomResponseBody(
      'Leads Fetched Successfully',
      await this.brokerReferredLeadsService.getLead(+id),
    );
  }
}
