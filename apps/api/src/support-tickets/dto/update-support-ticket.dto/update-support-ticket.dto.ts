import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateSupportTicketDto {
  @IsString()
  @IsOptional()
  @IsIn(['open', 'in_progress', 'closed'])
  status?: string;

  @IsString()
  @IsOptional()
  adminResponse?: string;
}
