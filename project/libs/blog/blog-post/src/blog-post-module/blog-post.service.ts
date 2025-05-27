import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginationResult } from '@project/core';
import { CreateLinkPostDto } from '../dto/create-link-post.dto';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { CreateQuotePostDto } from '../dto/create-quote-post.dto';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { BlogPostProperty } from '../swagger/blog-post-property';
import { BlogPostError } from './blog-post.constant';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostQuery, BlogPostSearchQuery } from './blog-post.query';
import { BlogPostRepository } from './blog-post.repository';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogPostFactory: BlogPostFactory,
  ) {}

  public async createVideoPost(
    dto: CreateVideoPostDto,
  ): Promise<BlogPostEntity> {
    const newPost = this.blogPostFactory.createVideoPost({
      ...dto,
      tags: this.checkTags(dto.tags),
    });

    return await this.blogPostRepository.save(newPost);
  }

  public async createTextPost(dto: CreateTextPostDto): Promise<BlogPostEntity> {
    const newPost = this.blogPostFactory.createTextPost({
      ...dto,
      tags: this.checkTags(dto.tags),
    });

    return await this.blogPostRepository.save(newPost);
  }

  public async createQuotePost(
    dto: CreateQuotePostDto,
  ): Promise<BlogPostEntity> {
    const newPost = this.blogPostFactory.createQuotePost({
      ...dto,
      tags: this.checkTags(dto.tags),
    });

    return await this.blogPostRepository.save(newPost);
  }

  public async createPhotoPost(
    dto: CreatePhotoPostDto,
  ): Promise<BlogPostEntity> {
    const newPost = this.blogPostFactory.createPhotoPost({
      ...dto,
      tags: this.checkTags(dto.tags),
    });

    return await this.blogPostRepository.save(newPost);
  }

  public async createLinkPost(dto: CreateLinkPostDto): Promise<BlogPostEntity> {
    const newPost = this.blogPostFactory.createLinkPost({
      ...dto,
      tags: this.checkTags(dto.tags),
    });

    return await this.blogPostRepository.save(newPost);
  }

  public async getPost(id: string): Promise<BlogPostEntity | null> {
    return this.blogPostRepository.findById(id);
  }

  public async createRepost(
    id: string,
    userId: string,
  ): Promise<BlogPostEntity> {
    const existsPost = await this.getPost(id);

    const existsRepost = await this.blogPostRepository.existsRepost(id, userId);

    if (existsRepost) {
      throw new ConflictException(BlogPostError.RepostExist);
    }

    const newPost = this.blogPostFactory.createRepost(
      existsPost.toPOJO(),
      userId,
    );
    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async findByName(
    query?: BlogPostSearchQuery,
  ): Promise<BlogPostEntity[]> {
    return await this.blogPostRepository.search(query);
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.blogPostRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPosts(
    query?: BlogPostQuery,
  ): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query);
  }

  public async createRepostPublication(
    id: string,
    userId: string,
  ): Promise<BlogPostEntity> {
    throw new Error('Not implemented');
  }

  public async getPostByTitle(title: string): Promise<BlogPostEntity> {
    throw new Error('Not implemented');
  }

  private checkTags(tags: string[]): string[] {
    if (tags && tags.length > 0) {
      const uniqueTags = [...new Set(tags)];
      if (uniqueTags.length > BlogPostProperty.Tags.Validate.MaxCount) {
        throw new BadRequestException(
          BlogPostProperty.Tags.Validate.MessageCount,
        );
      }

      const result = uniqueTags.map((tag): string => {
        if (!BlogPostProperty.Tags.Validate.RegExp.test(tag)) {
          throw new BadRequestException(BlogPostProperty.Tags.Validate.Message);
        }
        return tag.toLowerCase();
      });

      return result;
    }

    return [];
  }

  public async updateLikeCount(postId: string, value: number): Promise<void> {
    const existPost = await this.getPost(postId);
    existPost.likeCount += value;
    await this.blogPostRepository.update(existPost);
  }

  public async updateCommentCount(
    postId: string,
    value: number,
  ): Promise<void> {
    const existPost = await this.getPost(postId);
    existPost.commentCount += value;
    await this.blogPostRepository.update(existPost);
  }

  public async updatePost(
    id: string,
    dto: UpdatePostDto,
  ): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);
    if (!existsPost) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }
    if (existsPost.postType !== dto.postType) {
      throw new NotFoundException('postType cannot be changed');
    }

    let hasChanges = false;
    const dtoUpdate = { ...dto, tags: this.checkTags(dto.tags) };
    for (const [key, value] of Object.entries(dtoUpdate)) {
      if (value !== undefined && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }
    }
    if (hasChanges) {
      return await this.blogPostRepository.update(existsPost);
    }
    return existsPost;
  }
}
