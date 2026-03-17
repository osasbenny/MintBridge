import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateKycDto {
  @IsString()
  @IsOptional()
  @IsIn(['pending', 'approved', 'rejected'])
  status?: string;

  @IsString()
  @IsOptional()
  rejectionReason?: string;
}
