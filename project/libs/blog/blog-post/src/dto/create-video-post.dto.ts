import { IsNotEmpty, IsString } from "class-validator";
import { CreateBlogPostDto } from "./create-base-post.dto";

export class CreateVideoPostDto extends CreateBlogPostDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}
