import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCardOrdersService } from './gift-card-orders/gift-card-orders.service';
import { GiftCardOrdersController } from './gift-card-orders/gift-card-orders.controller';
import { GiftCardOrder } from '../database/entities/gift-card-order/gift-card-order';
import { User } from '../database/entities/user/user';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([GiftCardOrder, User]), AuthModule],
  providers: [GiftCardOrdersService],
  controllers: [GiftCardOrdersController],
  exports: [GiftCardOrdersService],
}
