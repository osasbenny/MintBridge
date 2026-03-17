import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoOrdersService } from './crypto-orders/crypto-orders.service';
import { CryptoOrdersController } from './crypto-orders/crypto-orders.controller';
import { CryptoOrder } from '../database/entities/crypto-order/crypto-order';
import { User } from '../database/entities/user/user';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoOrder, User]), AuthModule],
  providers: [CryptoOrdersService],
  controllers: [CryptoOrdersController],
  exports: [CryptoOrdersService],
}
