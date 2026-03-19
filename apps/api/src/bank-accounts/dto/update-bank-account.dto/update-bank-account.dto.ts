import { IsString, IsOptional, IsEnum } from 'class-validator';
import { BankAccountType } from '../../database/entities/bank-account/bank-account';

export class UpdateBankAccountDto {
  @IsString()
  @IsOptional()
  bankName?: string;

  @IsString()
  @IsOptional()
  accountNumber?: string;

  @IsString()
  @IsOptional()
  accountName?: string;

  @IsEnum(BankAccountType)
  @IsOptional()
  type?: BankAccountType;

  @IsString()
  @IsOptional()
  currency?: string;
}
