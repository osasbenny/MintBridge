import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions/transactions.service';
import { TransactionsController } from './transactions/transactions.controller';
import { Transaction } from '../database/entities/transaction/transaction';
import { User } from '../database/entities/user/user';
import { CryptoOrder } from '../database/entities/crypto-order/crypto-order';
import { GiftCardOrder } from '../database/entities/gift-card-order/gift-card-order';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, User, CryptoOrder, GiftCardOrder]), AuthModule],
  providers: [TransactionsService],
  controllers: [TransactionsController],
  exports: [TransactionsService],
})
export class TransactionsModule {}
