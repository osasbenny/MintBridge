import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportTicket } from '../../database/entities/support-ticket/support-ticket';
import { User } from '../../database/entities/user/user';
import { CreateSupportTicketDto } from '../dto/create-support-ticket.dto/create-support-ticket.dto';
import { UpdateSupportTicketDto } from '../dto/update-support-ticket.dto/update-support-ticket.dto';

@Injectable()
export class SupportTicketsService {
  constructor(
    @InjectRepository(SupportTicket)
    private supportTicketsRepository: Repository<SupportTicket>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: string, createSupportTicketDto: CreateSupportTicketDto): Promise<SupportTicket> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    const supportTicket = this.supportTicketsRepository.create({ ...createSupportTicketDto, user });
    return this.supportTicketsRepository.save(supportTicket);
  }

  async findAll(userId: string): Promise<SupportTicket[]> {
    return this.supportTicketsRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(userId: string, id: string): Promise<SupportTicket> {
    const supportTicket = await this.supportTicketsRepository.findOne({ where: { id, user: { id: userId } } });
    if (!supportTicket) {
      throw new NotFoundException(`Support ticket with ID ${id} not found for this user.`);
    }
    return supportTicket;
  }

  async update(id: string, updateSupportTicketDto: UpdateSupportTicketDto): Promise<SupportTicket> {
    const supportTicket = await this.supportTicketsRepository.findOne({ where: { id } });
    if (!supportTicket) {
      throw new NotFoundException(`Support ticket with ID ${id} not found.`);
    }
    Object.assign(supportTicket, updateSupportTicketDto);
    return this.supportTicketsRepository.save(supportTicket);
  }

  async remove(id: string): Promise<void> {
    const supportTicket = await this.supportTicketsRepository.findOne({ where: { id } });
    if (!supportTicket) {
      throw new NotFoundException(`Support ticket with ID ${id} not found.`);
    }
    await this.supportTicketsRepository.remove(supportTicket);
  }
}
