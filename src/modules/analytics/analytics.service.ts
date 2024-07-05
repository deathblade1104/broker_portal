import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AnalyticsService {
  constructor(private readonly configService: ConfigService) {}

  async fetchMetabaseLink(): Promise<string> {
    const metabaseExpiry = this.configService.get<string>('metabase.expiry');
    const secretKey = this.configService.get<string>('metabase.secretKey');
    if (secretKey === undefined || metabaseExpiry === undefined) {
      throw new Error('metabase.secretKey configuration value is missing');
    }
    let payload = {
      resource: { dashboard: 1 },
      params: {},
      exp: Math.round(Date.now() / 1000) + metabaseExpiry,
    };
    let token = sign(payload, secretKey);

    let iframeUrl =
      this.configService.get<string>('metabase.siteUrl') +
      '/embed/dashboard/' +
      token +
      '#bordered=true&titled=true';
    return iframeUrl;
  }
}
