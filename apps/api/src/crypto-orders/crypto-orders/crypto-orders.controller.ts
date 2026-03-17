import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { CryptoOrdersService } from './crypto-orders.service';
import { CreateCryptoOrderDto } from '../dto/create-crypto-order.dto/create-crypto-order.dto';
import { UpdateCryptoOrderDto } from '../dto/update-crypto-order.dto/update-crypto-order.dto';
import { JwtAuthGuard } from '../../auth/jwt.strategy/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('crypto-orders')
export class CryptoOrdersController {
  constructor(private readonly cryptoOrdersService: CryptoOrdersService) {}

  @Post()
  create(@Request() req, @Body(ValidationPipe) createCryptoOrderDto: CreateCryptoOrderDto) {
    return this.cryptoOrdersService.create(req.user.id, createCryptoOrderDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.cryptoOrdersService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.cryptoOrdersService.findOne(req.user.id, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCryptoOrderDto: UpdateCryptoOrderDto,
  ) {
    return this.cryptoOrdersService.update(id, updateCryptoOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cryptoOrdersService.remove(id);
  }
}
