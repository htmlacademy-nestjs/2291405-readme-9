import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/core';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { BlogPostProperty } from '../swagger/blog-post-property';
import { CreateBlogPostDto } from './create-base-post.dto';

export class CreateVideoPostDto extends CreateBlogPostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty(BlogPostProperty.Name.Description)
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty(BlogPostProperty.Url.Description)
  @ValidateIf((o) => [PostType.VIDEO, PostType.LINK].includes(o.postType))
  url: string;
}
