import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { MongoModule } from './database/mongo/mongo.module';
import { PostgresModule } from './database/postgres/postgres.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { BankAccountsModule } from './modules/bank_accounts/bank_accounts.module';
import { BrokerFeeBreakupsModule } from './modules/broker_fee_breakups/broker_fee_breakups.module';
import { BrokerReferredLeadsModule } from './modules/broker_referred_leads/broker_referred_leads.module';
import { BuildingTourBookingsModule } from './modules/building_tour_bookings/building_tour_bookings.module';
import { ClosedLeadsModule } from './modules/closed_leads/closed_leads.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { BuildingModule } from './services/building/building.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AnalyticsModule,
    BuildingModule,
    ConfigModule,
    HealthModule,
    MongoModule,
    PostgresModule,
    UsersModule,
    CompaniesModule,
    BankAccountsModule,
    BrokerReferredLeadsModule,
    ClosedLeadsModule,
    BrokerFeeBreakupsModule,
    BuildingTourBookingsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
