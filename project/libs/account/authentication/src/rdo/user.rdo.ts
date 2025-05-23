import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuthenticationProperty } from '../authentication-module/authentication.constant';

export class UserRdo {
  @Expose()
  @ApiProperty(AuthenticationProperty.Id.Description)
  public id: string;

  @Expose()
  @ApiProperty(AuthenticationProperty.Email.Description)
  public email: string;

  @Expose()
  @ApiProperty(AuthenticationProperty.Name.Description)
  public name: string;

  @Expose()
  @ApiProperty(AuthenticationProperty.Avatar.Description)
  public avatar: string;

  @Expose()
  @ApiProperty(AuthenticationProperty.RegisterDate.Description)
  public registerDate: string;

  @Expose()
  @ApiProperty(AuthenticationProperty.PostCount.Description)
  public postCount: string;

  @Expose()
  @ApiProperty(AuthenticationProperty.SubscriberCount.Description)
  public subscriberCount: string;
}
