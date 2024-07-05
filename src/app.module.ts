import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { MongoModule } from './database/mongo/mongo.module';
import { PostgresModule } from './database/postgres/postgres.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { HealthModule } from './modules/health/health.module';
import { BuildingModule } from './services/building/building.module';

@Module({
  imports: [
    AnalyticsModule,
    BuildingModule,
    ConfigModule,
    HealthModule,
    MongoModule,
    PostgresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
