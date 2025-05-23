import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

import { AuthenticationProperty } from '../authentication-module/authentication.constant';

export class ChangePasswordUserDto {

  @ApiProperty(AuthenticationProperty.Id.Description)
  @IsString()
  public id: string;

  @ApiProperty(AuthenticationProperty.OldPassword.Description)
  @IsString()
  public oldPassword: string;

  @ApiProperty(AuthenticationProperty.Password.Description)
  @IsString()
  @Length(
    AuthenticationProperty.Password.Validate.MinLength,
    AuthenticationProperty.Password.Validate.MaxLength,
    {
      message: AuthenticationProperty.Password.Validate.Message,
    }
  )
  public newPassword: string;
}
