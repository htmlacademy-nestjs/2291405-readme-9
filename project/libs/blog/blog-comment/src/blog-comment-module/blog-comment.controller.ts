import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogPostResponse } from '@project/blog-post';
import { CommonResponse } from '@project/core';
import { fillDto } from '@project/helpers';
import { BlogCommentQuery } from './blog-comment.query';
import { BlogCommentService } from './blog-comment.service';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';
import { BlogCommentRdo } from './rdo/blog-comment.rdo';
import { BlogCommentWithPaginationRdo } from './rdo/blog-comment-with-pagination.rdo';
import { BlogCommentAction } from './swagger/blog-comment-action';
import { BlogCommentResponse } from './swagger/blog-comment-response';

@ApiTags('Comments')
@Controller('posts')
export class BlogCommentController {
  constructor(private readonly blogCommentService: BlogCommentService) {}

  @Get('/:postId/comments')
  @ApiOperation(BlogCommentAction.Index)
  @ApiResponse(BlogCommentResponse.CommentList)
  @ApiResponse(BlogPostResponse.PostNotFound)
  public async index(
    @Param('postId') postId: string,
    @Query() query: BlogCommentQuery,
  ) {
    const commentsWithPagination = await this.blogCommentService.getComments(
      postId,
      query,
    );
    const result = {
      ...commentsWithPagination,
      entities: commentsWithPagination.entities.map((comment) =>
        comment.toPOJO(),
      ),
    };
    return fillDto(BlogCommentWithPaginationRdo, result);
  }

  @Post(':postId/comments')
  @ApiOperation(BlogCommentAction.AppendComment)
  @ApiResponse(BlogCommentResponse.AddComment)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CreateBlogCommentDto,
  ) {
    const newComment = await this.blogCommentService.appendComment(postId, dto);
    return fillDto(BlogCommentRdo, newComment.toPOJO());
  }

  @Delete('comments/:commentId')
  @ApiOperation(BlogCommentAction.RemoveComment)
  @ApiResponse(BlogCommentResponse.DelComment)
  @ApiResponse(BlogCommentResponse.CommentNotFound)
  @ApiResponse(BlogCommentResponse.NotAllow)
  @ApiResponse(CommonResponse.BadRequest)
  public async delete(
    @Param('commentId') commentId: string,
    @Body('userId') userId: string,
  ) {
    await this.blogCommentService.removeComment(commentId, userId);
  }
}
