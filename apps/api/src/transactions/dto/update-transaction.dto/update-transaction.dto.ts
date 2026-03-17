import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateTransactionDto {
  @IsString()
  @IsOptional()
  @IsIn(['pending', 'processing', 'completed', 'rejected', 'disputed'])
  status?: string;

  @IsString()
  @IsOptional()
  rejectionReason?: string;
}
