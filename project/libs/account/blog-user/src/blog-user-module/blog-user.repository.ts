import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/data-access';


import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';
import { User } from '@project/core';
import { PrismaClientService } from '@project/model';

@Injectable()
export class BlogUserRepository extends BasePostgresRepository<BlogUserEntity, User> {
  constructor(
    entityFactory: BlogUserFactory,
    override readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public override async save(entity: BlogUserEntity): Promise<BlogUserEntity> {
    console.log(entity.toPOJO() )
    const record = await this.client.user.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
    return entity;
  }

  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const user = await this.client.user.findFirst({
      where: {
        email: email
      }
    });

    if (! user) {
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

    if (! user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return this.createEntityFromDocument(user);
  }
}
