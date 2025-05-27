import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/blog-client';
import { PrismaBlogClientService } from '@project/blog-model';
import { Comment, PaginationResult, SortDirection } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';
import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentFactory } from './blog-comment.factory';
import { BlogCommentQuery } from './blog-comment.query';

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<
  BlogCommentEntity,
  Comment
> {
  constructor(
    entityFactory: BlogCommentFactory,
    override readonly client: PrismaBlogClientService,
  ) {
    super(entityFactory, client);
  }

  private async getCommentsCount(
    where: Prisma.CommentWhereInput,
  ): Promise<number> {
    return this.client.comment.count({ where });
  }

  public async save(entity: BlogCommentEntity): Promise<BlogCommentEntity> {
    const record = await this.client.comment.create({
      data: { ...entity.toPOJO() },
    });
    return this.createEntityFromDocument(record);
  }

  public async findById(id: string): Promise<BlogCommentEntity> {
    const document = await this.client.comment.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      },
    });
  }

  public async findByPostId(
    postId: string,
    query?: BlogCommentQuery,
  ): Promise<PaginationResult<BlogCommentEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.CommentWhereInput = { postId };
    const orderBy: Prisma.CommentOrderByWithRelationInput = {};

    orderBy.createDate = SortDirection.DESC;

    const [records, commentsCount] = await Promise.all([
      this.client.comment.findMany({ where, skip, take, orderBy }),
      this.getCommentsCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: Math.ceil(commentsCount / take),
      itemsPerPage: take,
      totalItems: commentsCount,
    };
  }
}
