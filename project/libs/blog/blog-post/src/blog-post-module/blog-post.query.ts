import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@prisma/blog-client';
import { SortDirection, SortType } from '@project/core';
import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationProperty } from '../swagger/blog-post-pagination-property';
import { BlogPostProperty } from '../swagger/blog-post-property';
import {
  BlogPostPaginationDefault,
  BlogPostSortDefault,
} from './blog-post.constant';

export class BlogPostQuery {
  public limit: number = BlogPostPaginationDefault.PostCountLimit;

  @ApiProperty(BlogPostProperty.SortDirection.Description)
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = BlogPostSortDefault.Direction;

  @ApiProperty(BlogPostProperty.SortType.Description)
  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortBy?: SortType = BlogPostSortDefault.Type;

  @ApiProperty(PaginationProperty.CurrentPage.Description)
  @Transform(
    ({ value }) => parseInt(value, 10) || BlogPostPaginationDefault.PageCurrent,
  )
  @IsOptional()
  public page?: number = BlogPostPaginationDefault.PageCurrent;

  @ApiProperty(BlogPostProperty.PostType.Description)
  @IsIn(Object.values(PostType))
  @IsOptional()
  postType?: PostType;

  @ApiProperty(BlogPostProperty.UserId.Description)
  @IsUUID()
  @IsOptional()
  originalUserId?: string;

  @ApiProperty(BlogPostProperty.IsDraft.Description)
  @Transform(({ value }) => (value === 'true' ? true : false))
  @IsBoolean()
  @IsOptional()
  isDraft?: boolean = false;

  @ApiProperty(BlogPostProperty.Tags.Description)
  @Transform(({ value }) => value.toLowerCase())
  @IsString()
  @IsOptional()
  public tag?: string;

  @ApiProperty(BlogPostProperty.UserId.Description)
  @IsUUID()
  @IsOptional()
  userId?: string;
}

export class BlogPostSearchQuery {
  public limit: number = BlogPostPaginationDefault.PostCountSearch;

  @ApiProperty(BlogPostProperty.Search.Description)
  @IsString()
  public name: string;
}

export class BlogSendUpdatesQuery {
  @ApiProperty(BlogPostProperty.StartDate.Description)
  @Transform(({ value }) => (value ? new Date(value) : null))
  public startDate?: Date;

  @ApiProperty(BlogPostProperty.UserId.Description)
  @IsUUID()
  @IsOptional()
  public userId?: string;
}
