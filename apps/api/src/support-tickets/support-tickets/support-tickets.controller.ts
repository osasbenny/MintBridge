import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { SupportTicketsService } from './support-tickets.service';
import { CreateSupportTicketDto } from '../dto/create-support-ticket.dto/create-support-ticket.dto';
import { UpdateSupportTicketDto } from '../dto/update-support-ticket.dto/update-support-ticket.dto';
import { JwtAuthGuard } from '../../auth/jwt.strategy/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('support-tickets')
export class SupportTicketsController {
  constructor(private readonly supportTicketsService: SupportTicketsService) {}

  @Post()
  create(@Request() req, @Body(ValidationPipe) createSupportTicketDto: CreateSupportTicketDto) {
    return this.supportTicketsService.create(req.user.id, createSupportTicketDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.supportTicketsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.supportTicketsService.findOne(req.user.id, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateSupportTicketDto: UpdateSupportTicketDto,
  ) {
    return this.supportTicketsService.update(id, updateSupportTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supportTicketsService.remove(id);
  }
}
