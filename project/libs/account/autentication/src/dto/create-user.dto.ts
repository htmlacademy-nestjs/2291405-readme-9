import { IsEmail, IsString, IsOptional } from 'class-validator';

import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class CreateUserDto {
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @IsString()
  public name: string;

  @IsString()
  public password: string;

  @IsString()
  @IsOptional()
  public avatarUrl?: string;
}
