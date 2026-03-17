import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateCryptoOrder {
  @IsString()
  @IsNotEmpty()
  cryptoCurrency: string;

  @IsNumber()
  @Min(0.00000001)
  cryptoAmount: number;

  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}
