import { IsNotEmpty, IsString } from "class-validator";
import { CreateBlogPostDto } from "./create-base-post.dto";

export class CreateLinkPostDto extends CreateBlogPostDto {

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
