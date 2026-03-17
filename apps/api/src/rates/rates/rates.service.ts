import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rate } from '../../database/entities/rate/rate';
import { CreateRateDto } from '../dto/create-rate.dto/create-rate.dto';
import { UpdateRateDto } from '../dto/update-rate.dto/update-rate.dto';

@Injectable()
export class RatesService {
  constructor(
    @InjectRepository(Rate)
    private ratesRepository: Repository<Rate>,
  ) {}

  async create(createRateDto: CreateRateDto): Promise<Rate> {
    const rate = this.ratesRepository.create(createRateDto);
    return this.ratesRepository.save(rate);
  }

  async findAll(): Promise<Rate[]> {
    return this.ratesRepository.find();
  }

  async findOne(id: string): Promise<Rate> {
    const rate = await this.ratesRepository.findOne({ where: { id } });
    if (!rate) {
      throw new NotFoundException(`Rate with ID ${id} not found.`);
    }
    return rate;
  }

  async update(id: string, updateRateDto: UpdateRateDto): Promise<Rate> {
    const rate = await this.ratesRepository.findOne({ where: { id } });
    if (!rate) {
      throw new NotFoundException(`Rate with ID ${id} not found.`);
    }
    Object.assign(rate, updateRateDto);
    return this.ratesRepository.save(rate);
  }

  async remove(id: string): Promise<void> {
    const rate = await this.ratesRepository.findOne({ where: { id } });
    if (!rate) {
      throw new NotFoundException(`Rate with ID ${id} not found.`);
    }
    await this.ratesRepository.remove(rate);
  }
}
