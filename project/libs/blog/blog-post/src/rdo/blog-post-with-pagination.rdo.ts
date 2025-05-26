import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PaginationProperty } from '../swagger/blog-post-pagination-property';
import { BlogPostProperty } from '../swagger/blog-post-property';
import { BlogPostRdo } from './blog-post.rdo';

export class BlogPostWithPaginationRdo {
  @ApiProperty(BlogPostProperty.Posts.Description)
  @Type(() => BlogPostRdo)
  @ValidateNested({ always: true })
  @Expose()
  public entities: BlogPostRdo[];

  @ApiProperty(PaginationProperty.TotalPages.Description)
  @Expose()
  public totalPages: number;

  @ApiProperty(PaginationProperty.TotalItems.Description)
  @Expose()
  public totalItems: number;

  @ApiProperty(PaginationProperty.CurrentPage.Description)
  @Expose()
  public currentPage: number;

  @ApiProperty(PaginationProperty.ItemsPerPage.Description)
  @Expose()
  public itemsPerPage: number;
}
