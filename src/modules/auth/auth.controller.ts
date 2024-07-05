import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiCustomResponseObject } from '../../common/decorators/api-response.decorator';
import { ZodPipe } from '../../common/pipes/zod.pipe';
import { CustomResponseBody } from '../../common/providers/customResponse';
import { SignUpUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { SignUpUserSchema } from '../users/users.zod.schema';
import { AuthService } from './auth.service';
import { loginRequestDtoSchema } from './auth.zod.schema';
import { loginDto } from './dto/create-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ZodPipe(SignUpUserSchema))
  @ApiCustomResponseObject(User)
  async signup(
    @Body() userData: SignUpUserDto,
  ): Promise<CustomResponseBody<User>> {
    return new CustomResponseBody(
      `User Signed Up Successfully.`,
      await this.authService.signup(userData),
    );
  }

  @Post('login')
  @UsePipes(new ZodPipe(loginRequestDtoSchema))
  @ApiCustomResponseObject(loginDto)
  async login(
    @Body() { email, password }: { email: string; password: string },
  ): Promise<CustomResponseBody<loginDto>> {
    return new CustomResponseBody(
      `User Logged in Successfully.`,
      await this.authService.login(email, password),
    );
  }
}
