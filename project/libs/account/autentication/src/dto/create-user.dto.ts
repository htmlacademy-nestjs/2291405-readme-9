import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, Length } from 'class-validator';
import { AuthenticationProperty } from '../authentication-module/authentication.constant';


export class CreateUserDto {

  @ApiProperty(AuthenticationProperty.Email.Description)
  @IsString()
  @IsEmail({}, { message: AuthenticationProperty.Email.Validate.Message })
  public email: string;

  @ApiProperty(AuthenticationProperty.Name.Description)
  @IsString()
  @Length(
    AuthenticationProperty.Name.Validate.MinLength,
    AuthenticationProperty.Name.Validate.MaxLength,
    {
      message: AuthenticationProperty.Name.Validate.Message,
    }
  )
  public name: string;

  @ApiProperty(AuthenticationProperty.Password.Description)
  @IsString()
  @Length(
    AuthenticationProperty.Password.Validate.MinLength,
    AuthenticationProperty.Password.Validate.MaxLength,
    {
      message: AuthenticationProperty.Password.Validate.Message,
    }
  )
  public password: string;

@ApiProperty(AuthenticationProperty.Avatar.Description)
  @IsString()
  @IsOptional()
  public avatar: string | null;
}
