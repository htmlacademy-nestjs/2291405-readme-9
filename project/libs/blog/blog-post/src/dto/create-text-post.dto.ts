import { IsNotEmpty, IsString } from "class-validator";
import { CreateBlogPostDto } from "./create-base-post.dto";

export class CreateTextPostDto extends CreateBlogPostDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  preview: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
