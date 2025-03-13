import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  login: string = '';

  @IsNotEmpty()
  @IsString()
  password: string = '';

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  typeUser?: string;
}
