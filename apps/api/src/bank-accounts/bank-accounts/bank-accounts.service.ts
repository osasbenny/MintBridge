import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from '../../database/entities/bank-account/bank-account';
import { User } from '../../database/entities/user/user';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto/update-bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountsRepository: Repository<BankAccount>,
  ) {}

  async create(userId: string, createBankAccountDto: CreateBankAccountDto): Promise<BankAccount> {
    const user = new User();
    user.id = userId;
    const bankAccount = this.bankAccountsRepository.create({ ...createBankAccountDto, user });
    return this.bankAccountsRepository.save(bankAccount);
  }

  async findAll(userId: string): Promise<BankAccount[]> {
    return this.bankAccountsRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(userId: string, id: string): Promise<BankAccount> {
    const bankAccount = await this.bankAccountsRepository.findOne({ where: { id, user: { id: userId } } });
    if (!bankAccount) {
      throw new NotFoundException(`Bank account with ID ${id} not found for this user.`);
    }
    return bankAccount;
  }

  async update(userId: string, id: string, updateBankAccountDto: UpdateBankAccountDto): Promise<BankAccount> {
    const bankAccount = await this.findOne(userId, id);
    Object.assign(bankAccount, updateBankAccountDto);
    return this.bankAccountsRepository.save(bankAccount);
  }

  async remove(userId: string, id: string): Promise<void> {
    const bankAccount = await this.findOne(userId, id);
    await this.bankAccountsRepository.remove(bankAccount);
  }
}
