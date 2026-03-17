import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsOptional()
  type?: string; // e.g., 'system', 'transaction', 'alert'

  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
}
