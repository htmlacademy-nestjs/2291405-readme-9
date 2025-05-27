import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostState } from '@prisma/blog-client';
import { BlogPostError, BlogPostService } from '@project/blog-post';
import { PaginationResult } from '@project/core';
import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentFactory } from './blog-comment.factory';
import { BlogCommentQuery } from './blog-comment.query';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentError } from './blog-comment-constant';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogCommentFactory: BlogCommentFactory,
    private readonly blogPostService: BlogPostService,
  ) {}

  public async getComments(
    postId: string,
    query?: BlogCommentQuery,
  ): Promise<PaginationResult<BlogCommentEntity>> {
    const post = await this.blogPostService.getPost(postId);
    return this.blogCommentRepository.findByPostId(post.id, query);
  }

  public async appendComment(
    postId: string,
    dto: CreateBlogCommentDto,
  ): Promise<BlogCommentEntity> {
    const existsPost = await this.blogPostService.getPost(postId);
    if (existsPost.postState === PostState.DRAFT) {
      throw new ForbiddenException(BlogPostError.PostIsDraft);
    }
    const newComment = this.blogCommentFactory.createFromDto(
      dto,
      existsPost.id,
    );
    await this.blogPostService.updateCommentCount(postId, 1);
    return await this.blogCommentRepository.save(newComment);
  }

  public async removeComment(id: string, userId: string): Promise<void> {
    const existComment = await this.blogCommentRepository.findById(id);

    if (userId !== existComment.userId) {
      throw new ForbiddenException(BlogCommentError.NotAllow);
    }
    const existsPost = await this.blogPostService.getPost(existComment.postId);
    if (existsPost.postState === PostState.DRAFT) {
      throw new ForbiddenException(BlogPostError.PostIsDraft);
    }
    try {
      await this.blogCommentRepository.deleteById(id);
      await this.blogPostService.updateCommentCount(existComment.postId, -1);
    } catch {
      throw new NotFoundException(BlogCommentError.CommentNotFound);
    }
  }
}
