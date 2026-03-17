import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateRateDto {
  @IsString()
  @IsOptional()
  currencyPair?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  buyRate?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  sellRate?: number;
}
