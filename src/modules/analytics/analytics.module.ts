import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
    controllers: [AnalyticsController],
    providers: [AnalyticsService,ConfigService],
})
export class AnalyticsModule {}
