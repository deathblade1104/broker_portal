import { Module } from '@nestjs/common';
import { CompaniesModule } from '../companies/companies.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, CompaniesModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
