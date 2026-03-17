import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  type: string; // 'crypto_sell', 'gift_card_liquidation'

  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsOptional()
  reference?: string;

  @IsString()
  @IsOptional()
  payoutDetails?: string; // JSON string of bank details
}
