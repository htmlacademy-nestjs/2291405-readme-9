import { ApiProperty } from '@nestjs/swagger';
import { AuthenticationProperty } from '@project/authentication';
import { BlogPostProperty } from '@project/blog-post';
import { Expose } from 'class-transformer';
import { BlogCommentProperty } from '../swagger/blog-comment-property';

export class BlogCommentRdo {
  @ApiProperty(BlogCommentProperty.Id.Description)
  @Expose()
  public id: string;

  @ApiProperty(BlogPostProperty.Id.Description)
  @Expose()
  public postId: string;

  @ApiProperty(AuthenticationProperty.Id.Description)
  @Expose()
  public userId: string;

  @ApiProperty(BlogCommentProperty.Text.Description)
  @Expose()
  public text: string;

  @ApiProperty(BlogPostProperty.CreateDate.Description)
  @Expose()
  public createDate: Date;
}
