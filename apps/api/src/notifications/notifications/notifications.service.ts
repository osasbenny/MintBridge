import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../database/entities/notification/notification';
import { User } from '../../database/entities/user/user';
import { CreateNotificationDto } from '../dto/create-notification.dto/create-notification.dto';
import { UpdateNotificationDto } from '../dto/update-notification.dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: string, createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    const notification = this.notificationsRepository.create({ ...createNotificationDto, user });
    return this.notificationsRepository.save(notification);
  }

  async findAll(userId: string): Promise<Notification[]> {
    return this.notificationsRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(userId: string, id: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({ where: { id, user: { id: userId } } });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found for this user.`);
    }
    return notification;
  }

  async update(userId: string, id: string, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({ where: { id, user: { id: userId } } });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found for this user.`);
    }
    Object.assign(notification, updateNotificationDto);
    return this.notificationsRepository.save(notification);
  }

  async remove(userId: string, id: string): Promise<void> {
    const notification = await this.notificationsRepository.findOne({ where: { id, user: { id: userId } } });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found for this user.`);
    }
    await this.notificationsRepository.remove(notification);
  }
}
