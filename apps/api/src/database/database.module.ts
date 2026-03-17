import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user/user';
import { BankAccount } from './entities/bank-account/bank-account';
import { Kyc } from './entities/kyc/kyc';
import { CryptoOrder } from './entities/crypto-order/crypto-order';
import { GiftCardOrder } from './entities/gift-card-order/gift-card-order';
import { Transaction } from './entities/transaction/transaction';
import { SupportTicket } from './entities/support-ticket/support-ticket';
import { Notification } from './entities/notification/notification';
import { Rate } from './entities/rate/rate';
import { Admin } from './entities/admin/admin';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        entities: [
          User,
          BankAccount,
          Kyc,
          CryptoOrder,
          GiftCardOrder,
          Transaction,
          SupportTicket,
          Notification,
          Rate,
          Admin,
        ],
        synchronize: true, // Use migrations in production
      }),
    }),
  ],
})
export class DatabaseModule {}
