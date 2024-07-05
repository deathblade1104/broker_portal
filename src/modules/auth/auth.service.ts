import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CompaniesService } from '../companies/companies.service';
import { SignUpUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { loginDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly companiesService: CompaniesService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userData: SignUpUserDto): Promise<User> {
    const [existingUser] = await this.usersService.findUserByEmail(
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

    console.log(userData.password);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    let userPayload: Partial<User> = {
      name: userData.name,
      email: userData.email,
      phone_number: userData.phone_number,
      password: hashedPassword,
      is_admin: userData.is_admin,
    };

    if (userData.company) {
      const newCompany = await this.companiesService.createCompany(
        userData.company,
      );
      userPayload.company_id = newCompany.id;
    }

    return await this.usersService.createUser(userPayload);
  }

  async login(email: string, password: string): Promise<loginDto> {
    const [user] = await this.usersService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
