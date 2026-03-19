import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { BankAccountType } from '../../database/entities/bank-account/bank-account';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  accountName: string;

  @IsEnum(BankAccountType)
  @IsNotEmpty()
  type: BankAccountType;

  @IsString()
  @IsNotEmpty()
  currency: string;
}
