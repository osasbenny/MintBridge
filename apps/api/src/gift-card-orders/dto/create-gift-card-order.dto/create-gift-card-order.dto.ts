import { IsString, IsNotEmpty, IsUrl, IsNumber, Min } from 'class-validator';

export class CreateGiftCardOrderDto {
  @IsString()
  @IsNotEmpty()
  cardType: string;

  @IsString()
  @IsNotEmpty()
  cardValue: string;

  @IsString()
  @IsNotEmpty()
  cardCode: string;

  @IsUrl()
  @IsNotEmpty()
  cardImageUrl: string;

  @IsNumber()
  @Min(0.01)
  fiatAmount: number;
}
