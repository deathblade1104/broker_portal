import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCustomResponseArray,
  ApiCustomResponseObject,
} from '../../common/decorators/api-response.decorator';
import { CustomResponseBody } from '../../common/providers/customResponse';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiCustomResponseArray(User)
  async findAll() {
    return new CustomResponseBody(
      'Fetched all users successfully',
      await this.usersService.findAll(),
    );
  }

  @Get(':id')
  @ApiCustomResponseObject(User)
  async findOne(@Param('id') id: string) {
    return new CustomResponseBody(
      `Fetched user with Id - ${id} successfully`,
      await this.usersService.findById(+id),
    );
  }
}
