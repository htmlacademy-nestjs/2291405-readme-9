import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@prisma/blog-client';
import { IsNotEmpty, IsString, Length, ValidateIf } from 'class-validator';
import { BlogPostProperty } from '../swagger/blog-post-property';
import { CreateBlogPostDto } from './create-base-post.dto';

export class CreateQuotePostDto extends CreateBlogPostDto {
  @IsString()
  @IsNotEmpty()
  @Length(
    BlogPostProperty.QuoteText.Validate.MinLength,
    BlogPostProperty.QuoteText.Validate.MaxLength,
  )
  @ApiProperty(BlogPostProperty.QuoteText.Description)
  quoteText: string;

  @IsString()
  @IsNotEmpty()
  @Length(
    BlogPostProperty.QuoteAuthor.Validate.MinLength,
    BlogPostProperty.QuoteAuthor.Validate.MaxLength,
  )
  @ValidateIf((o) => o.postType === PostType.QUOTE)
  @ApiProperty(BlogPostProperty.QuoteAuthor.Description)
  quoteAuthor: string;
}
