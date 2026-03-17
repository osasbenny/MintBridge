import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatesService } from './rates/rates.service';
import { RatesController } from './rates/rates.controller';
import { Rate } from '../database/entities/rate/rate';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rate]), AuthModule],
  providers: [RatesService],
  controllers: [RatesController],
  exports: [RatesService],
})
export class RatesModule {}
