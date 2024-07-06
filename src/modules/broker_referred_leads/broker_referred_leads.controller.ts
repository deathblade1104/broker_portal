import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginationQuery, PaginateQuery } from 'nestjs-paginate';
import { ApiCustomResponseObject } from '../../common/decorators/api-response.decorator';
import { ZodPipe } from '../../common/pipes/zod.pipe';
import { CustomResponseBody } from '../../common/providers/customResponse';
import { brokerReferredLeadConfig } from './broker_referred_leads.config';
import { BrokerReferredLeadsService } from './broker_referred_leads.service';
import {
  BrokerReferredLeadsSchema,
  UpdateBrokerReferredLeadsSchema,
} from './broker_referred_leads.zod.schema';
import {
  CreateBrokerReferredLeadDto,
  LeadsPaginatedResponseDto,
  UpdateStatusDto,
} from './dto';

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
  @ApiPaginationQuery(brokerReferredLeadConfig)
  @ApiCustomResponseObject(LeadsPaginatedResponseDto)
  async findAll(@Query() query: PaginateQuery) {
    return new CustomResponseBody(
      'Lead Paginated and Fetched Successfully',
      await this.brokerReferredLeadsService.getAllPaginated(query),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new CustomResponseBody(
      'Lead Fetched Successfully',
      await this.brokerReferredLeadsService.getLead(+id),
    );
  }

  @Put(':id/status')
  @UsePipes(new ZodPipe(UpdateBrokerReferredLeadsSchema))
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return new CustomResponseBody(
      'Lead Status Updated Successfully',
      await this.brokerReferredLeadsService.updateStatus(+id, dto),
    );
  }
}
