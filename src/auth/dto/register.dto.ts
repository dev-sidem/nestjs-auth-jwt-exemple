import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator';

export class RegisterDto {
  /*@IsNotEmpty()
  @IsString()
  login: string = '';

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  typeUser?: string;
  */
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  password: string = '';
}
