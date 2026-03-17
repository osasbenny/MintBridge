import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateRateDto {
  @IsString()
  @IsNotEmpty()
  currencyPair: string; // e.g., BTC/USD, ETH/NGN

  @IsNumber()
  @Min(0)
  buyRate: number;

  @IsNumber()
  @Min(0)
  sellRate: number;
}
