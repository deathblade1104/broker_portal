import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';
import configuration from './configuration';

@Global()
@Module({
  imports: [NestConfigModule.forRoot({
    load: [configuration],
    isGlobal: true,
  })],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class ConfigModule {}
