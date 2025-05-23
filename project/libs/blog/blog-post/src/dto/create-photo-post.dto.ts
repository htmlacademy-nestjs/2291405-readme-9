import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BlogPostProperty } from '../swagger/blog-post-property';
import { CreateBlogPostDto } from './create-base-post.dto';

export class CreatePhotoPostDto extends CreateBlogPostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty(BlogPostProperty.Photo.Description)
  photo: string;
}
