import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGreetings(): string {
    return 'Brokered BE is up and running.';
  }
}
