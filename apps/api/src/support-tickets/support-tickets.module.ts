import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportTicketsService } from './support-tickets/support-tickets.service';
import { SupportTicketsController } from './support-tickets/support-tickets.controller';
import { SupportTicket } from '../database/entities/support-ticket/support-ticket';
import { User } from '../database/entities/user/user';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([SupportTicket, User]), AuthModule],
  providers: [SupportTicketsService],
  controllers: [SupportTicketsController],
  exports: [SupportTicketsService],
}
