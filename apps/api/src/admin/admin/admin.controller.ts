import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from '../dto/create-admin.dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto/update-admin.dto';
import { JwtAuthGuard } from '../../auth/jwt.strategy/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @Roles('admin')
  create(@Body(ValidationPipe) createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body(ValidationPipe) updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
