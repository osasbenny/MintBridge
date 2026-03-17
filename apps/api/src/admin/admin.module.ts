import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin/admin.service';
import { AdminController } from './admin/admin.controller';
import { Admin } from '../database/entities/admin/admin';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), AuthModule],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
