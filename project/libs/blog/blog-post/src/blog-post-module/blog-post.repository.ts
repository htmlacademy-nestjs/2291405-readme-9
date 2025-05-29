import { Injectable, NotFoundException } from '@nestjs/common';
import { PostState, Prisma } from '@prisma/blog-client';
import { PrismaBlogClientService } from '@project/blog-model';
import { PaginationResult } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostQuery, BlogPostSearchQuery } from './blog-post.query';

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

  public async find(
    query?: BlogPostQuery,
  ): Promise<PaginationResult<BlogPostEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.tag) {
      where.tags = {
        some: { name: query.tag },
      };
    }

    if (query?.postType) {
      where.postType = query.postType;
    }

    if (query?.isDraft) {
      where.userId = query?.userId ?? '-';
      where.postState = PostState.DRAFT;
    } else {
      if (query?.userId) {
        where.userId = query.userId;
      }
    }
    if (query?.sortBy) {
      orderBy[query.sortBy] = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          comments: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: Math.ceil(postCount / take),
      itemsPerPage: take,
      totalItems: postCount,
    };
  }

  public async search(query: BlogPostSearchQuery): Promise<BlogPostEntity[]> {
    const posts = await this.client.post.findMany({
      where: {
        name: { contains: query.name, mode: 'insensitive' },
      },
      take: query.limit,
    });

    return posts.map((post) => this.createEntityFromDocument(post));
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  public async existsRepost(postId: string, userId: string): Promise<boolean> {
    const count = await this.client.post.count({
      where: { originalId: postId, userId: userId },
    });

    return count > 0;
  }

  public async update(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.post.update({
      where: { id: entity.id },
      data: {
        postType: pojoEntity.postType,
        originalId: pojoEntity.originalId || null,
        tags: {
          set: [],
          connectOrCreate: pojoEntity.tags.map((tag) => ({
            create: { name: tag },
            where: { name: tag },
          })),
        },
        publicationDate: pojoEntity.publicationDate,
        likeCount: pojoEntity.likeCount,
        commentCount: pojoEntity.commentCount,
        name: pojoEntity.name,
        url: pojoEntity.url,
        preview: pojoEntity.preview,
        text: pojoEntity.text,
        quoteText: pojoEntity.quoteText,
        quoteAuthor: pojoEntity.quoteAuthor,
        description: pojoEntity.description,
      },
    });
    return await this.findById(record.id);
  }
}
