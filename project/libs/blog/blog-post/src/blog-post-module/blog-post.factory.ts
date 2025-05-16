import { Injectable } from '@nestjs/common';

import { Post, EntityFactory, } from '@project/core';
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
    const entity = new BlogPostEntity();
    entity.name = dto.name;
    entity.url = dto.url;

    return entity;
  }

  public createTextPost(dto: CreateTextPostDto): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.name = dto.name;
    entity.preview = dto.preview;
    entity.text = dto.text;

    return entity;
  }

  public createQuotePost(dto: CreateQuotePostDto): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.quoteText = dto.quoteText;
    entity.quoteAuthor = dto.quoteAuthor;
;
    return entity;
  }

  public createPhotoPost(dto: CreatePhotoPostDto): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.photo = dto.photo;

    return entity;
  }

  public createLinkPost(dto: CreateLinkPostDto): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.url = dto.url;
    entity.description = dto.description;

    return entity;
  }
}
