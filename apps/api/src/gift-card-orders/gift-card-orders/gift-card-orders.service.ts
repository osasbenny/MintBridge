import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GiftCardOrder } from '../../database/entities/gift-card-order/gift-card-order';
import { User } from '../../database/entities/user/user';
import { CreateGiftCardOrderDto } from '../dto/create-gift-card-order.dto/create-gift-card-order.dto';
import { UpdateGiftCardOrderDto } from '../dto/update-gift-card-order.dto/update-gift-card-order.dto';

@Injectable()
export class GiftCardOrdersService {
  constructor(
    @InjectRepository(GiftCardOrder)
    private giftCardOrdersRepository: Repository<GiftCardOrder>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: string, createGiftCardOrderDto: CreateGiftCardOrderDto): Promise<GiftCardOrder> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    const giftCardOrder = this.giftCardOrdersRepository.create({ ...createGiftCardOrderDto, user });
    return this.giftCardOrdersRepository.save(giftCardOrder);
  }

  async findAll(userId: string): Promise<GiftCardOrder[]> {
    return this.giftCardOrdersRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(userId: string, id: string): Promise<GiftCardOrder> {
    const giftCardOrder = await this.giftCardOrdersRepository.findOne({ where: { id, user: { id: userId } } });
    if (!giftCardOrder) {
      throw new NotFoundException(`Gift card order with ID ${id} not found for this user.`);
    }
    return giftCardOrder;
  }

  async update(id: string, updateGiftCardOrderDto: UpdateGiftCardOrderDto): Promise<GiftCardOrder> {
    const giftCardOrder = await this.giftCardOrdersRepository.findOne({ where: { id } });
    if (!giftCardOrder) {
      throw new NotFoundException(`Gift card order with ID ${id} not found.`);
    }
    Object.assign(giftCardOrder, updateGiftCardOrderDto);
    return this.giftCardOrdersRepository.save(giftCardOrder);
  }

  async remove(id: string): Promise<void> {
    const giftCardOrder = await this.giftCardOrdersRepository.findOne({ where: { id } });
    if (!giftCardOrder) {
      throw new NotFoundException(`Gift card order with ID ${id} not found.`);
    }
    await this.giftCardOrdersRepository.remove(giftCardOrder);
  }
}
