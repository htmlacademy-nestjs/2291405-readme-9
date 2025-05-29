import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@prisma/blog-client';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { BlogPostProperty } from '../swagger/blog-post-property';

export class CreateBlogPostDto {
  @IsIn(Object.values(PostType))
  @IsNotEmpty()
  @ApiProperty(BlogPostProperty.PostType.Description)
  postType: PostType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty(BlogPostProperty.UserId.Description)
  userId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty(BlogPostProperty.Tags.Description)
  tags: string[];
}
