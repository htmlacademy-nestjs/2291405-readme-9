import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BlogCommentRdo } from '../rdo/blog-comment.rdo';
import { PaginationProperty } from '../swagger/blog-comment-pagination-property';
import { BlogCommentProperty } from '../swagger/blog-comment-property';

export class BlogCommentWithPaginationRdo {
  @ApiProperty(BlogCommentProperty.CommentList.Description)
  @Type(() => BlogCommentRdo)
  @ValidateNested({ always: true })
  @Expose()
  public entities: BlogCommentRdo[];

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
