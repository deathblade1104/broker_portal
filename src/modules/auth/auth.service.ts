import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CompaniesService } from '../companies/companies.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly companiesService: CompaniesService,
  ) {}

  async signup(userData: any): Promise<User> {
    const existingUser = await this.usersService.findUserByEmail(
      userData.email,
    );
    
    if (existingUser) {
      throw new BadRequestException('Email is already registered');
    }

    if (!userData.company_id && !userData.company) {
      throw new BadRequestException(
        'Either Company Object or company_id should be present.',
      );
    }

    if (userData.is_admin && userData.company_id !== 1) {
      throw new BadRequestException(
        'Admin users can only belong to company_id 1',
      );
    }

    if (!userData.is_admin && userData.company_id === 1) {
      throw new BadRequestException(
        'Non-admin users cannot belong to company_id 1',
      );
    }

    const hashedPassword: string = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    if (userData.company) {
      const newCompany = await this.companiesService.createCompany(
        userData.company,
      );
      userData.company_id = newCompany.id;
    }

    return await this.usersService.upsertOne(userData);
  }

  async login(email: string, password: string): Promise<User> {
    const [user] = await this.usersService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }
    return user;
  }
}
