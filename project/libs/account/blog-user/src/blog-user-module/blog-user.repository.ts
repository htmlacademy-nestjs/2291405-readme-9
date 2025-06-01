import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/model';
import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';

@Injectable()
export class BlogUserRepository extends BasePostgresRepository<
  BlogUserEntity,
  User
> {
  constructor(
    entityFactory: BlogUserFactory,
    override readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public override async save(entity: BlogUserEntity): Promise<BlogUserEntity> {
    const record = await this.client.user.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
    return entity;
  }

  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const user = await this.client.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    return this.createEntityFromDocument(user);
  }

  public override async findById(id: string): Promise<BlogUserEntity | null> {
    const user = await this.client.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return this.createEntityFromDocument(user);
  }
}
