import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@prisma/blog-client';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import { BlogPostProperty } from '../swagger/blog-post-property';

export class UpdatePostDto {
  @IsIn(Object.values(PostType))
  @IsNotEmpty()
  @ApiProperty(BlogPostProperty.PostType.Description)
  postType: PostType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty(BlogPostProperty.Tags.Description)
  tags: string[];

  @ValidateIf((o) => [PostType.VIDEO, PostType.TEXT].includes(o.postType))
  @IsString()
  @Length(
    BlogPostProperty.Name.Validate.MinLength,
    BlogPostProperty.Name.Validate.MaxLength,
  )
  @ApiProperty(BlogPostProperty.Name.Description)
  name?: string;

  @IsString()
  @ValidateIf((o) => o.postType === PostType.TEXT)
  @Length(
    BlogPostProperty.Preview.Validate.MinLength,
    BlogPostProperty.Preview.Validate.MaxLength,
  )
  @ApiProperty(BlogPostProperty.Preview.Description)
  preview?: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.postType === PostType.TEXT)
  @Length(
    BlogPostProperty.Text.Validate.MinLength,
    BlogPostProperty.Text.Validate.MaxLength,
  )
  @ApiProperty(BlogPostProperty.Text.Description)
  text?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty(BlogPostProperty.Url.Description)
  @ValidateIf((o) => [PostType.VIDEO, PostType.LINK].includes(o.postType))
  url?: string;

  @IsString()
  @IsNotEmpty()
  @Length(
    BlogPostProperty.QuoteText.Validate.MinLength,
    BlogPostProperty.QuoteText.Validate.MaxLength,
  )
  @ApiProperty(BlogPostProperty.QuoteText.Description)
  quoteText?: string;

  @IsString()
  @IsNotEmpty()
  @Length(
    BlogPostProperty.QuoteAuthor.Validate.MinLength,
    BlogPostProperty.QuoteAuthor.Validate.MaxLength,
  )
  @ValidateIf((o) => o.postType === PostType.QUOTE)
  @ApiProperty(BlogPostProperty.QuoteAuthor.Description)
  quoteAuthor?: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.postType === PostType.PHOTO)
  @ApiProperty(BlogPostProperty.Photo.Description)
  photo?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ValidateIf((o) => o.postType === PostType.LINK)
  @Length(BlogPostProperty.Description.Validate.MaxLength)
  @ApiProperty(BlogPostProperty.Description.Description)
  description?: string;
}
