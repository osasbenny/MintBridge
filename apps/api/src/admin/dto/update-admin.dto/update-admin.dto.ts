import { IsString, IsOptional, IsEmail, MinLength } from 'class-validator';

export class UpdateAdminDto {
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
