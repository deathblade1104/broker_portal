import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomResponseBody } from './common/providers/customResponse';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getGreetings(): Record<string,any> {
    return new CustomResponseBody(this.appService.getGreetings());
  }
}
