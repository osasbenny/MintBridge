import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { GiftCardOrdersService } from './gift-card-orders.service';
import { CreateGiftCardOrderDto } from '../dto/create-gift-card-order.dto/create-gift-card-order.dto';
import { UpdateGiftCardOrderDto } from '../dto/update-gift-card-order.dto/update-gift-card-order.dto';
import { JwtAuthGuard } from '../../auth/jwt.strategy/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('gift-card-orders')
export class GiftCardOrdersController {
  constructor(private readonly giftCardOrdersService: GiftCardOrdersService) {}

  @Post()
  create(@Request() req, @Body(ValidationPipe) createGiftCardOrderDto: CreateGiftCardOrderDto) {
    return this.giftCardOrdersService.create(req.user.id, createGiftCardOrderDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.giftCardOrdersService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.giftCardOrdersService.findOne(req.user.id, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateGiftCardOrderDto: UpdateGiftCardOrderDto,
  ) {
    return this.giftCardOrdersService.update(id, updateGiftCardOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giftCardOrdersService.remove(id);
  }
}
