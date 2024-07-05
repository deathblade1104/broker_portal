import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CustomResponseBody } from '../../common/providers/customResponse';
import { BuildingService } from './building.service';

@ApiTags('Building')
@Controller('metadata/building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/all')
  async findAll(@Paginate() query: PaginateQuery) {
    const data = await this.buildingService.findAll();
    return new CustomResponseBody('All schedules Fetched Successfully', data);
  }
}
