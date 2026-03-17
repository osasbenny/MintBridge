import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto/update-transaction.dto';
import { JwtAuthGuard } from '../../auth/jwt.strategy/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Request() req, @Body(ValidationPipe) createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(req.user.id, createTransactionDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.transactionsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.transactionsService.findOne(req.user.id, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
