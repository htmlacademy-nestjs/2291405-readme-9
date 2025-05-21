import { IsNotEmpty, IsString} from "class-validator";
import { CreateBlogPostDto } from "./create-base-post.dto";


export class CreatePhotoPostDto extends CreateBlogPostDto {

  @IsString()
  @IsNotEmpty()
  photo: string;
}
