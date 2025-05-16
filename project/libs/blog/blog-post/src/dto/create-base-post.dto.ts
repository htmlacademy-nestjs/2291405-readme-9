import { PostState, PostType } from "@project/core";
import { IsArray, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateBlogPostDto {

  @IsIn(Object.values(PostType))
  @IsNotEmpty()
  postType: PostType;

  @IsIn(Object.values(PostType))
  @IsNotEmpty()
  postState: PostState;

  @IsString()
  userId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[] | undefined;
}
