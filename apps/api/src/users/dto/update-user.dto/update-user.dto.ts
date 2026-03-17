import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsBoolean()
  @IsOptional()
  isEmailVerified?: boolean;
}
