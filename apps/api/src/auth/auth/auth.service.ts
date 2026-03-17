import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../../database/entities/user/user';
import { RegisterDto } from '../dto/register.dto/register.dto';
import { LoginDto } from '../dto/login.dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ accessToken: string }> {
    const { email, password, phoneNumber } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      email,
      passwordHash: hashedPassword,
      phoneNumber,
    });

    await this.usersRepository.save(user);

    const accessToken = this.jwtService.sign({ id: user.id, email: user.email, role: user.role });
    return { accessToken };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({ id: user.id, email: user.email, role: user.role });
    return { accessToken };
  }

  async validateUser(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
