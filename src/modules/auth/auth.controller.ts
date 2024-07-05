import { Body, Controller, Post } from '@nestjs/common';
import { CustomResponseBody } from '../../common/providers/customResponse';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userData: any): Promise<CustomResponseBody<User>> {
    return new CustomResponseBody(
      'Signed up Successfully',
      await this.authService.signup(userData),
    );
  }

  @Post('login')
  async login(
    @Body() { email, password }: { email: string; password: string },
  ): Promise<CustomResponseBody<User>> {
    return new CustomResponseBody(
      'Logged in Successfully',
      await this.authService.login(email, password),
    );
  }
}
