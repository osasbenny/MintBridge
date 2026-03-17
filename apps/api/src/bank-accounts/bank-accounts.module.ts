import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountsService } from './bank-accounts/bank-accounts.service';
import { BankAccountsController } from './bank-accounts/bank-accounts.controller';
import { BankAccount } from '../database/entities/bank-account/bank-account';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount]), AuthModule],
  providers: [BankAccountsService],
  controllers: [BankAccountsController],
  exports: [BankAccountsService],
}
