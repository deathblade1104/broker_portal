import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '../../common/services/baseCrud.service';

import { EmailService } from '../../services/email/email.service';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService extends BaseCrudService<User> {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly repo: UsersRepository,
    private readonly emailService: EmailService,
  ) {
    super(repo, 'Users');
  }

  async findUserByEmail(email: string): Promise<User[]> {
    return await this.findAll({ where: { email } });
  }

  async createUser(dto: Partial<User>) {
    return await this.upsertOne(dto);
  }

  async sendEmail(userId: number, subject: string, text: string) {
    const user = await this.findById(userId);
    await this.emailService.sendMail(user.email, subject, text);
    return;
  }
}
