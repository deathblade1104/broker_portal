import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGreetings(): string {
    return 'We-Brokered BE is up and running.';
  }
}
