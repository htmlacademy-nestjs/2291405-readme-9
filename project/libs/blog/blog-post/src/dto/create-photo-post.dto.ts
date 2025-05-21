import { IsNotEmpty, IsString} from "class-validator";
import { CreateBlogPostDto } from "./create-base-post.dto";
import { BlogPostProperty } from "../swagger/blog-post-property";
import { ApiProperty } from "@nestjs/swagger";


export class CreatePhotoPostDto extends CreateBlogPostDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty(BlogPostProperty.Photo.Description)
  photo: string;
}
