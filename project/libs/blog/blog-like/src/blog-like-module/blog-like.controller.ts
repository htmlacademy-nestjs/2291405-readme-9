import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogPostResponse, BlogPostService } from '@project/blog-post';
import { CommonResponse } from '@project/core';
import { BlogLikeService } from './blog-like.service';
import { BlogLikeAction } from './swagger/blog-like-action';
import { BlogLikeResponse } from './swagger/blog-like-response';

@ApiTags('Likes')
@Controller('posts/:postId/likes')
export class BlogLikeController {
  constructor(
    private readonly blogLikeService: BlogLikeService,
    private readonly blogPostService: BlogPostService,
  ) {}

  @Post('/')
  @ApiOperation(BlogLikeAction.AppendLike)
  @ApiResponse(BlogLikeResponse.SetLike)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(BlogLikeResponse.LikeExists)
  @ApiResponse(CommonResponse.BadRequest)
  public async append(
    @Param('postId') postId: string,
    @Body('userId') userId: string,
  ) {
    //TODO проверить авторизацию пользователя
    await this.blogPostService.updateLikeCount(postId, 1);
  }

  @Delete('/')
  @ApiOperation(BlogLikeAction.RemoveLike)
  @ApiResponse(BlogLikeResponse.DelLike)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(BlogLikeResponse.LikeNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  public async remove(
    @Param('postId') postId: string,
    @Body('userId') userId: string,
  ) {
    //TODO проверить авторизацию пользователя
    await this.blogPostService.updateLikeCount(postId, -1);
  }
}
