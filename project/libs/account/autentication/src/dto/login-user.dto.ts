import { IsEmail, IsString } from 'class-validator';

import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class LoginUserDto {
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @IsString()
  public password: string;
}
