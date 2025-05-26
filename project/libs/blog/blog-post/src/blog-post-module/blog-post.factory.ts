import { Injectable } from '@nestjs/common';
import { PostState, PostType } from '@prisma/blog-client';
import { EntityFactory, Post } from '@project/core';
import dayjs from 'dayjs';
import { CreateLinkPostDto } from '../dto/create-link-post.dto';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { CreateQuotePostDto } from '../dto/create-quote-post.dto';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';
import { BlogPostEntity } from './blog-post.entity';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public createVideoPost(dto: CreateVideoPostDto): BlogPostEntity {
    const post: Post = {
      postType: PostType.VIDEO,
      postState: PostState.PUBLISHED,
      userId: dto.userId,
      isRepost: false,
      originalUserId: dto.userId,
      likeCount: 0,
      commentCount: 0,
      tags: dto.tags,
      createDate: new Date(),
      publicationDate: new Date(),
    };

    const entity = new BlogPostEntity(post);
    entity.name = dto.name;
    entity.url = dto.url;

    return entity;
  }

  public createTextPost(dto: CreateTextPostDto): BlogPostEntity {
    const post: Post = {
      postType: PostType.TEXT,
      postState: PostState.PUBLISHED,
      userId: dto.userId,
      isRepost: false,
      originalUserId: dto.userId,
      likeCount: 0,
      commentCount: 0,
      tags: dto.tags,
      createDate: new Date(),
      publicationDate: new Date(),
    };

    const entity = new BlogPostEntity(post);
    entity.name = dto.name;
    entity.preview = dto.preview;
    entity.text = dto.text;

    return entity;
  }

  public createQuotePost(dto: CreateQuotePostDto): BlogPostEntity {
    const post: Post = {
      postType: PostType.QUOTE,
      postState: PostState.PUBLISHED,
      userId: dto.userId,
      isRepost: false,
      originalUserId: dto.userId,
      likeCount: 0,
      commentCount: 0,
      tags: dto.tags,
      createDate: new Date(),
      publicationDate: new Date(),
    };

    const entity = new BlogPostEntity(post);
    entity.quoteText = dto.quoteText;
    entity.quoteAuthor = dto.quoteAuthor;
    return entity;
  }

  public createPhotoPost(dto: CreatePhotoPostDto): BlogPostEntity {
    const post: Post = {
      postType: PostType.PHOTO,
      postState: PostState.PUBLISHED,
      userId: dto.userId,
      isRepost: false,
      originalUserId: dto.userId,
      likeCount: 0,
      commentCount: 0,
      tags: dto.tags,
      createDate: new Date(),
      publicationDate: new Date(),
    };

    const entity = new BlogPostEntity(post);
    entity.photo = dto.photo;

    return entity;
  }

  public createLinkPost(dto: CreateLinkPostDto): BlogPostEntity {
    const post: Post = {
      postType: PostType.LINK,
      postState: PostState.PUBLISHED,
      userId: dto.userId,
      isRepost: false,
      originalUserId: dto.userId,
      likeCount: 0,
      commentCount: 0,
      tags: dto.tags,
      createDate: new Date(),
      publicationDate: new Date(),
    };

    const entity = new BlogPostEntity(post);
    entity.url = dto.url;
    entity.description = dto.description;

    return entity;
  }

  public createRepost(originalPost: Post, userId: string): BlogPostEntity {
    const newPost = new BlogPostEntity(originalPost);

    newPost.userId = userId;
    newPost.originalUserId = originalPost.userId;
    newPost.originalId = originalPost.id;
    newPost.createDate = dayjs().toDate();
    newPost.publicationDate = dayjs().toDate();
    newPost.likeCount = 0;
    newPost.commentCount = 0;

    return newPost;
  }
}
