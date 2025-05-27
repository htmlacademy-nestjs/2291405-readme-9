import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@prisma/blog-client';
import { IsNotEmpty, IsString, Length, ValidateIf } from 'class-validator';
import { BlogPostProperty } from '../swagger/blog-post-property';
import { CreateBlogPostDto } from './create-base-post.dto';

export class CreateTextPostDto extends CreateBlogPostDto {
  @ValidateIf((o) => [PostType.VIDEO, PostType.TEXT].includes(o.postType))
  @IsString()
  @Length(
    BlogPostProperty.Name.Validate.MinLength,
    BlogPostProperty.Name.Validate.MaxLength,
  )
  @ApiProperty(BlogPostProperty.Name.Description)
  name: string;

  @IsString()
  @ValidateIf((o) => o.postType === PostType.TEXT)
  @Length(
    BlogPostProperty.Preview.Validate.MinLength,
    BlogPostProperty.Preview.Validate.MaxLength,
  )
  @ApiProperty(BlogPostProperty.Preview.Description)
  preview: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.postType === PostType.TEXT)
  @Length(
    BlogPostProperty.Text.Validate.MinLength,
    BlogPostProperty.Text.Validate.MaxLength,
  )
  @ApiProperty(BlogPostProperty.Text.Description)
  text: string;
}
