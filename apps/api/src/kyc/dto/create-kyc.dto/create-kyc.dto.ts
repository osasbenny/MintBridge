import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class CreateKycDto {
  @IsString()
  @IsNotEmpty()
  documentType: string;

  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @IsUrl()
  @IsNotEmpty()
  documentFrontUrl: string;

  @IsUrl()
  @IsOptional()
  documentBackUrl?: string;
}
