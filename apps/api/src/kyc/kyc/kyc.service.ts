import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kyc } from '../../database/entities/kyc/kyc';
import { User } from '../../database/entities/user/user';
import { CreateKycDto } from '../dto/create-kyc.dto/create-kyc.dto';
import { UpdateKycDto } from '../dto/update-kyc.dto/update-kyc.dto';

@Injectable()
export class KycService {
  constructor(
    @InjectRepository(Kyc)
    private kycRepository: Repository<Kyc>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: string, createKycDto: CreateKycDto): Promise<Kyc> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    const kyc = this.kycRepository.create({ ...createKycDto, user });
    return this.kycRepository.save(kyc);
  }

  async findAll(userId: string): Promise<Kyc[]> {
    return this.kycRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(userId: string, id: string): Promise<Kyc> {
    const kyc = await this.kycRepository.findOne({ where: { id, user: { id: userId } } });
    if (!kyc) {
      throw new NotFoundException(`KYC submission with ID ${id} not found for this user.`);
    }
    return kyc;
  }

  async update(id: string, updateKycDto: UpdateKycDto): Promise<Kyc> {
    const kyc = await this.kycRepository.findOne({ where: { id } });
    if (!kyc) {
      throw new NotFoundException(`KYC submission with ID ${id} not found.`);
    }
    Object.assign(kyc, updateKycDto);
    return this.kycRepository.save(kyc);
  }

  async remove(id: string): Promise<void> {
    const kyc = await this.kycRepository.findOne({ where: { id } });
    if (!kyc) {
      throw new NotFoundException(`KYC submission with ID ${id} not found.`);
    }
    await this.kycRepository.remove(kyc);
  }
}
