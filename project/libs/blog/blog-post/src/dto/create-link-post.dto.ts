import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@prisma/blog-client';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  ValidateIf,
} from 'class-validator';
import { BlogPostProperty } from '../swagger/blog-post-property';
import { CreateBlogPostDto } from './create-base-post.dto';

export class CreateLinkPostDto extends CreateBlogPostDto {
  @IsNotEmpty()
  @ValidateIf((o) => [PostType.VIDEO, PostType.LINK].includes(o.postType))
  @IsUrl()
  @ApiProperty(BlogPostProperty.Url.Description)
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ValidateIf((o) => o.postType === PostType.LINK)
  @Length(BlogPostProperty.Description.Validate.MaxLength)
  @ApiProperty(BlogPostProperty.Description.Description)
  description: string;
}
