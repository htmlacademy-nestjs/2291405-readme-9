import { IsNotEmpty, IsString } from "class-validator";
import { CreateBlogPostDto } from "./create-base-post.dto";

export class CreateQuotePostDto extends CreateBlogPostDto {

  @IsString()
  @IsNotEmpty()
  quoteText: string;

  @IsString()
  @IsNotEmpty()
  quoteAuthor: string;
}
