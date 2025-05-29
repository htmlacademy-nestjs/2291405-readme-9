import { Injectable } from '@nestjs/common';
import { PrismaBlogClientService } from '@project/blog-model';
import { Like } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';
import { BlogLikeEntity } from './blog-like.entity';
import { BlogLikeFactory } from './blog-like.factory';

@Injectable()
export class BlogLikeRepository extends BasePostgresRepository<
  BlogLikeEntity,
  Like
> {
  constructor(
    likeFactory: BlogLikeFactory,
    override readonly client: PrismaBlogClientService,
  ) {
    super(likeFactory, client);
  }
  public async isLikeExists({ userId, postId }: Like): Promise<boolean> {
    const like = await this.client.like.findFirst({
      where: {
        userId,
        postId,
      },
    });

    return like !== null;
  }

  public override async save(entity: BlogLikeEntity): Promise<BlogLikeEntity> {
    const record = await this.client.like.create({
      data: { ...entity.toPOJO() },
    });
    return this.createEntityFromDocument(record);
  }

  public async deleteByIds({ userId, postId }: Like): Promise<void> {
    await this.client.like.delete({
      where: {
        userIdPostId: {
          postId,
          userId,
        },
      },
    });
  }
}
