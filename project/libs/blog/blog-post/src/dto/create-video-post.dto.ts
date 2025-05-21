import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateIf } from "class-validator";
import { CreateBlogPostDto } from "./create-base-post.dto";
import { PostType } from '@project/core';
import { BlogPostProperty } from '../swagger/blog-post-property';

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
