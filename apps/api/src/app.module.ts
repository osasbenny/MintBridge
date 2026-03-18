import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { KycModule } from './kyc/kyc.module';
import { CryptoOrdersModule } from './crypto-orders/crypto-orders.module';
import { GiftCardOrdersModule } from './gift-card-orders/gift-card-orders.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SupportTicketsModule } from './support-tickets/support-tickets.module';
import { NotificationsModule } from './notifications/notifications.module';
import { RatesModule } from './rates/rates.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.example',
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    BankAccountsModule,
    KycModule,
    CryptoOrdersModule,
    GiftCardOrdersModule,
    TransactionsModule,
    SupportTicketsModule,
    NotificationsModule,
    RatesModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
