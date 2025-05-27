import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { BlogCommentPaginationDefault } from './blog-comment-constant';
import { PaginationProperty } from './swagger/blog-comment-pagination-property';

export class BlogCommentQuery {
  public limit: number = BlogCommentPaginationDefault.PostCountLimit;

  @ApiProperty(PaginationProperty.CurrentPage.Description)
  @Transform(
    ({ value }) =>
      parseInt(value, 10) || BlogCommentPaginationDefault.PageCurrent,
  )
  @IsOptional()
  public page: number = BlogCommentPaginationDefault.PageCurrent;
}
