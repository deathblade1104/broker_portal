import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '../../common/services/baseCrud.service';

import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService extends BaseCrudService<User> {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly repo: UsersRepository,
  ) {
    super(repo, 'Users');
  }

  async findUserByEmail(email: string): Promise<User[]> {
    return await this.findAll({ where: { email } });
  }

  async createUser(dto: Partial<User>) {
    return await this.upsertOne(dto);
  }
}
