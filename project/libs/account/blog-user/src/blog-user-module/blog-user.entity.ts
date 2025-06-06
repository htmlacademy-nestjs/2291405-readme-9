import { AuthUser, Entity, StorableEntity } from '@project/core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public name: string;
  public avatar?: string;
  public registerDate?: Date;
  public postCount: number;
  public subscriberCount: number;
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.name = user.name;
    this.avatar = user.avatar ?? null;
    this.registerDate = user.registerDate ?? new Date();
    this.passwordHash = user.passwordHash;
    this.postCount = user.postCount ?? 0;
    this.subscriberCount = user.subscriberCount ?? 0;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id || undefined,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      registerDate: this.registerDate,
      passwordHash: this.passwordHash,
      postCount: this.postCount ?? 0,
      subscriberCount: this.subscriberCount ?? 0,
    };
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
