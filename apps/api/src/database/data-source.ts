import { DataSource } from 'typeorm';
import { User } from './entities/user/user';
import { Admin } from './entities/admin/admin';
import { BankAccount } from './entities/bank-account/bank-account';
import { CryptoOrder } from './entities/crypto-order/crypto-order';
import { GiftCardOrder } from './entities/gift-card-order/gift-card-order';
import { Kyc } from './entities/kyc/kyc';
import { Notification } from './entities/notification/notification';
import { Rate } from './entities/rate/rate';
import { SupportTicket } from './entities/support-ticket/support-ticket';
import { Transaction } from './entities/transaction/transaction';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'mintbridge_db',
  synchronize: false, // Set to true for development, false for production with migrations
  logging: false,
  entities: [
    User,
    Admin,
    BankAccount,
    CryptoOrder,
    GiftCardOrder,
    Kyc,
    Notification,
    Rate,
    SupportTicket,
    Transaction,
  ],
  migrations: [__dirname + '/migrations/*.ts'],
  subscribers: [],
});
