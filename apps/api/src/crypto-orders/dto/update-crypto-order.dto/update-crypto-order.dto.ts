import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateCryptoOrderDto {
  @IsString()
  @IsOptional()
  @IsIn(['pending', 'processing', 'completed', 'rejected', 'disputed'])
  status?: string;

  @IsString()
  @IsOptional()
  rejectionReason?: string;
}
