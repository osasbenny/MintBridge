import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../../database/entities/transaction/transaction';
import { User } from '../../database/entities/user/user';
import { CryptoOrder } from '../../database/entities/crypto-order/crypto-order';
import { GiftCardOrder } from '../../database/entities/gift-card-order/gift-card-order';
import { CreateTransactionDto } from '../dto/create-transaction.dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(CryptoOrder)
    private cryptoOrderRepository: Repository<CryptoOrder>,
    @InjectRepository(GiftCardOrder)
    private giftCardOrderRepository: Repository<GiftCardOrder>,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const transaction = this.transactionsRepository.create({ ...createTransactionDto, user });

    // Link with CryptoOrder or GiftCardOrder if applicable
    if (createTransactionDto.type === 'crypto_sell' && createTransactionDto.reference) {
      const cryptoOrder = await this.cryptoOrderRepository.findOne({ where: { id: createTransactionDto.reference } });
      if (cryptoOrder) {
        transaction.cryptoOrder = cryptoOrder;
      }
    } else if (createTransactionDto.type === 'gift_card_liquidation' && createTransactionDto.reference) {
      const giftCardOrder = await this.giftCardOrderRepository.findOne({ where: { id: createTransactionDto.reference } });
      if (giftCardOrder) {
        transaction.giftCardOrder = giftCardOrder;
      }
    }

    return this.transactionsRepository.save(transaction);
  }

  async findAll(userId: string): Promise<Transaction[]> {
    return this.transactionsRepository.find({ where: { user: { id: userId } }, relations: ['cryptoOrder', 'giftCardOrder'] });
  }

  async findOne(userId: string, id: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({ where: { id, user: { id: userId } }, relations: ['cryptoOrder', 'giftCardOrder'] });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found for this user.`);
    }
    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found.`);
    }
    Object.assign(transaction, updateTransactionDto);
    return this.transactionsRepository.save(transaction);
  }

  async remove(id: string): Promise<void> {
    const transaction = await this.transactionsRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found.`);
    }
    await this.transactionsRepository.remove(transaction);
  }
}
