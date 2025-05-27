import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@prisma/blog-client';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { BlogPostProperty } from '../swagger/blog-post-property';
import { CreateBlogPostDto } from './create-base-post.dto';

export class CreatePhotoPostDto extends CreateBlogPostDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.postType === PostType.PHOTO)
  @ApiProperty(BlogPostProperty.Photo.Description)
  photo: string;
}
