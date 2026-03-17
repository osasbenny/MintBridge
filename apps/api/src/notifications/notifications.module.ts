import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsController } from './notifications/notifications.controller';
import { Notification } from '../database/entities/notification/notification';
import { User } from '../database/entities/user/user';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, User]), AuthModule],
  providers: [NotificationsService],
  controllers: [NotificationsController],
  exports: [NotificationsService],
}
