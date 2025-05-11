import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public avatarUrl: string;

  @Expose()
  public registerDate: string;

  @Expose()
  public postsCount: string;

  @Expose()
  public subscribersCount: string;
}
