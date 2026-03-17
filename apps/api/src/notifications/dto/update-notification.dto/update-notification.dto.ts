import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateNotificationDto {
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @IsString()
  @IsOptional()
  type?: string;
}
