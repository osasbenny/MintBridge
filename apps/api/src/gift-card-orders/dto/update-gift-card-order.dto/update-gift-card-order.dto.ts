import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateGiftCardOrderDto {
  @IsString()
  @IsOptional()
  @IsIn(['pending', 'processing', 'completed', 'rejected', 'disputed'])
  status?: string;

  @IsString()
  @IsOptional()
  rejectionReason?: string;
}
