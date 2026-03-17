import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto/update-bank-account.dto';
import { JwtAuthGuard } from '../../auth/jwt.strategy/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  create(@Request() req, @Body(ValidationPipe) createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountsService.create(req.user.id, createBankAccountDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.bankAccountsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.bankAccountsService.findOne(req.user.id, id);
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body(ValidationPipe) updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.bankAccountsService.update(req.user.id, id, updateBankAccountDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.bankAccountsService.remove(req.user.id, id);
  }
}
