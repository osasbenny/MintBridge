import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KycService } from './kyc/kyc.service';
import { KycController } from './kyc/kyc.controller';
import { Kyc } from '../database/entities/kyc/kyc';
import { User } from '../database/entities/user/user';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Kyc, User]), AuthModule],
  providers: [KycService],
  controllers: [KycController],
  exports: [KycService],
}
