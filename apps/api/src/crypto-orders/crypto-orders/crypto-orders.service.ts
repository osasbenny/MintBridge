import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoOrder } from '../../database/entities/crypto-order/crypto-order';
import { User } from '../../database/entities/user/user';
import { CreateCryptoOrderDto } from '../dto/create-crypto-order.dto/create-crypto-order.dto';
import { UpdateCryptoOrderDto } from '../dto/update-crypto-order.dto/update-crypto-order.dto';

@Injectable()
export class CryptoOrdersService {
  constructor(
    @InjectRepository(CryptoOrder)
    private cryptoOrdersRepository: Repository<CryptoOrder>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: string, createCryptoOrderDto: CreateCryptoOrderDto): Promise<CryptoOrder> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    // For simplicity, fiatAmount is calculated here. In a real app, this would involve a rate service.
    const fiatAmount = createCryptoOrderDto.cryptoAmount * 25000; // Example rate
    const cryptoOrder = this.cryptoOrdersRepository.create({ ...createCryptoOrderDto, user, fiatAmount });
    return this.cryptoOrdersRepository.save(cryptoOrder);
  }

  async findAll(userId: string): Promise<CryptoOrder[]> {
    return this.cryptoOrdersRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(userId: string, id: string): Promise<CryptoOrder> {
    const cryptoOrder = await this.cryptoOrdersRepository.findOne({ where: { id, user: { id: userId } } });
    if (!cryptoOrder) {
      throw new NotFoundException(`Crypto order with ID ${id} not found for this user.`);
    }
    return cryptoOrder;
  }

  async update(id: string, updateCryptoOrderDto: UpdateCryptoOrderDto): Promise<CryptoOrder> {
    const cryptoOrder = await this.cryptoOrdersRepository.findOne({ where: { id } });
    if (!cryptoOrder) {
      throw new NotFoundException(`Crypto order with ID ${id} not found.`);
    }
    Object.assign(cryptoOrder, updateCryptoOrderDto);
    return this.cryptoOrdersRepository.save(cryptoOrder);
  }

  async remove(id: string): Promise<void> {
    const cryptoOrder = await this.cryptoOrdersRepository.findOne({ where: { id } });
    if (!cryptoOrder) {
      throw new NotFoundException(`Crypto order with ID ${id} not found.`);
    }
    await this.cryptoOrdersRepository.remove(cryptoOrder);
  }
}
