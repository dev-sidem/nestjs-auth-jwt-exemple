import { IsOptional, IsEmail, IsString, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  login?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  typeUser?: string;

  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;
}
