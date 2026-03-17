import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from '../dto/create-notification.dto/create-notification.dto';
import { UpdateNotificationDto } from '../dto/update-notification.dto/update-notification.dto';
import { JwtAuthGuard } from '../../auth/jwt.strategy/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Request() req, @Body(ValidationPipe) createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(req.user.id, createNotificationDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.notificationsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.notificationsService.findOne(req.user.id, id);
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body(ValidationPipe) updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(req.user.id, id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.notificationsService.remove(req.user.id, id);
  }
}
