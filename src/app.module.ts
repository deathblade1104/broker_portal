import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { MongoModule } from './database/mongo/mongo.module';
import { PostgresModule } from './database/postgres/postgres.module';
import { AuthModule } from './modules/auth/auth.module';
import { BankAccountsModule } from './modules/bank_accounts/bank_accounts.module';
import { BrokerLeadHistoryModule } from './modules/broker_lead_history/broker_lead_history.module';
import { BrokerReferredLeadsModule } from './modules/broker_referred_leads/broker_referred_leads.module';
import { ClosedLeadsModule } from './modules/closed_leads/closed_leads.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { HealthModule } from './modules/health/health.module';
import { SlotsModule } from './modules/tour_slots/tour_slots.module';
import { UsersModule } from './modules/users/users.module';
import { BuildingModule } from './services/building/building.module';
import { EmailModule } from './services/email/email.module';

@Module({
  imports: [
    AuthModule,
    EmailModule,
    BuildingModule,
    ConfigModule,
    HealthModule,
    MongoModule,
    PostgresModule,
    UsersModule,
    CompaniesModule,
    BankAccountsModule,
    BrokerReferredLeadsModule,
    BrokerLeadHistoryModule,
    SlotsModule,
    ClosedLeadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
