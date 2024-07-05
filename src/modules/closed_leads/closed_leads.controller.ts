import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClosedLeadsService } from './closed_leads.service';
import { CreateClosedLeadDto } from './dto/create-closed_lead.dto';
import { UpdateClosedLeadDto } from './dto/update-closed_lead.dto';

@Controller('closed-leads')
export class ClosedLeadsController {
  constructor(private readonly closedLeadsService: ClosedLeadsService) {}

  @Post()
  create(@Body() createClosedLeadDto: CreateClosedLeadDto) {
    return this.closedLeadsService.create(createClosedLeadDto);
  }

  @Get()
  findAll() {
    return this.closedLeadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.closedLeadsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClosedLeadDto: UpdateClosedLeadDto) {
    return this.closedLeadsService.update(+id, updateClosedLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.closedLeadsService.remove(+id);
  }
}
