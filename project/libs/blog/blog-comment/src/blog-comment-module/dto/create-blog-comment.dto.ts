import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { BlogCommentProperty } from '../swagger/blog-comment-property';

export class CreateBlogCommentDto {
  @ApiProperty(BlogCommentProperty.Text.Description)
  @IsString()
  @IsNotEmpty()
  public text: string;

  @IsString()
  @IsUUID()
  public userId: string;
}
