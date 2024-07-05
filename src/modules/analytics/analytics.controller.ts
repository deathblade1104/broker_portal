import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomResponseBody } from '../../common/providers/customResponse';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get('metabase')
    @ApiOperation({
      summary:
        'Fetch metabase embdedded url based on roles.',
    })
    async metabaselink() {
        return new CustomResponseBody(
          'Metabase iframe link fetched Successfully',
          await this.analyticsService.fetchMetabaseLink(),
        );
      }
}
