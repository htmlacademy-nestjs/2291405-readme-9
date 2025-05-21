import { Injectable } from '@nestjs/common';

import { Post, EntityFactory, PostType, PostState } from '@project/core';
import { BlogPostEntity } from './blog-post.entity';
import { CreateVideoPostDto } from 'src/dto/create-video-post.dto';
import { CreateTextPostDto } from 'src/dto/create-text-post.dto';
import { CreateQuotePostDto } from 'src/dto/create-quote-post.dto';
import { CreatePhotoPostDto } from 'src/dto/create-photo-post.dto';
import { CreateLinkPostDto } from 'src/dto/create-link-post.dto';


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
      publicationDate: new Date()
    }
    
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
      publicationDate: new Date()
    }

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
      publicationDate: new Date()
    }

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
      publicationDate: new Date()
    }

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
      publicationDate: new Date()
    }

    const entity = new BlogPostEntity(post);
    entity.url = dto.url;
    entity.description = dto.description;

    return entity;
  }
}
