import { Controller, Get, Put, Body, Param, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt.strategy/jwt-auth.guard'; // Assuming you'll create this guard
import { UsersService } from './users.service';
import { UpdateUserDto } from '../dto/update-user.dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // User object is attached to the request by JwtAuthGuard
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(@Request() req, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }
}
