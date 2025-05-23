import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaBlogClientService } from '@project/blog-model';
import { BasePostgresRepository } from '@project/data-access';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity> {
  constructor(
    entityFactory: BlogPostFactory,
    override readonly client: PrismaBlogClientService,
  ) {
    super(entityFactory, client);
  }

  public override async save(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        tags: pojoEntity.tags
          ? {
              connectOrCreate: pojoEntity.tags.map((tag) => ({
                create: { name: tag },
                where: { name: tag },
              })),
            }
          : undefined,
        comments: {
          connect: [],
        },
        likes: {
          connect: [],
        },
      },
    });

    const postEntity = await this.findById(record.id);
    if (postEntity) {
      return postEntity;
    }
    throw new Error('Unexpected error');
  }

  public override async findById(id: string): Promise<BlogPostEntity | null> {
    const post = await this.client.post.findFirst({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(post);
  }

  public override async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }
}
