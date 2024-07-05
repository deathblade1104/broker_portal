import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './config.zod.schema';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<EnvConfig>) {}

  get<T extends keyof EnvConfig>(key: T): EnvConfig[T] {
    return this.configService.get(key) as EnvConfig[T];
  }
}
