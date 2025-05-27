import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommonResponse } from '@project/core';
import { fillDto } from '@project/helpers';
import { CreateLinkPostDto } from '../dto/create-link-post.dto';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { CreateQuotePostDto } from '../dto/create-quote-post.dto';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { BlogPostRdo } from '../rdo/blog-post.rdo';
import { BlogPostWithPaginationRdo } from '../rdo/blog-post-with-pagination.rdo';
import { BlogPostAction } from '../swagger/blog-post-action';
import { BlogPostResponse } from '../swagger/blog-post-response';
import { BlogPostQuery, BlogPostSearchQuery } from './blog-post.query';
import { BlogPostService } from './blog-post.service';

@ApiTags('Blog')
@Controller('blog')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Post('create/video')
  @ApiOperation(BlogPostAction.CreateVideo)
  @ApiResponse(BlogPostResponse.PostCreated)
  @ApiResponse(CommonResponse.BadRequest)
  public async createVideo(
    @Body() dto: CreateVideoPostDto,
  ): Promise<BlogPostRdo> {
    const newPost = await this.blogPostService.createVideoPost(dto);
    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @Post('create/text')
  @ApiOperation(BlogPostAction.CreateText)
  @ApiResponse(BlogPostResponse.PostCreated)
  @ApiResponse(CommonResponse.BadRequest)
  public async createText(
    @Body() dto: CreateTextPostDto,
  ): Promise<BlogPostRdo> {
    const newPost = await this.blogPostService.createTextPost(dto);
    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @Post('create/quote')
  @ApiOperation(BlogPostAction.CreateQuote)
  @ApiResponse(BlogPostResponse.PostCreated)
  @ApiResponse(CommonResponse.BadRequest)
  public async createQuote(
    @Body() dto: CreateQuotePostDto,
  ): Promise<BlogPostRdo> {
    const newPost = await this.blogPostService.createQuotePost(dto);
    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @Post('create/photo')
  @ApiOperation(BlogPostAction.CreatePhoto)
  @ApiResponse(BlogPostResponse.PostCreated)
  @ApiResponse(CommonResponse.BadRequest)
  public async createPhoto(
    @Body() dto: CreatePhotoPostDto,
  ): Promise<BlogPostRdo> {
    const newPost = await this.blogPostService.createPhotoPost(dto);
    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @Post('create/link')
  @ApiOperation(BlogPostAction.CreateLink)
  @ApiResponse(BlogPostResponse.PostCreated)
  @ApiResponse(CommonResponse.BadRequest)
  public async createLink(
    @Body() dto: CreateLinkPostDto,
  ): Promise<BlogPostRdo> {
    const newPost = await this.blogPostService.createLinkPost(dto);
    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @Get(':id')
  @ApiOperation(BlogPostAction.View)
  @ApiResponse(BlogPostResponse.PostFound)
  @ApiResponse(BlogPostResponse.PostNotFound)
  public async show(@Param('id') id: string) {
    const post = await this.blogPostService.getPost(id);
    return fillDto(BlogPostRdo, post.toPOJO());
  }

  @Delete(':id')
  @ApiOperation(BlogPostAction.Delete)
  @ApiResponse(BlogPostResponse.PostDeleted)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @HttpCode(BlogPostResponse.PostDeleted.status)
  public async remove(@Param('id') id: string): Promise<void> {
    await this.blogPostService.deletePost(id);
  }

  @Get('')
  public async index(@Query() query: BlogPostQuery) {
    const postsWithPagination = await this.blogPostService.getPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    };
    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @Post(':id/repost')
  public async repost(@Param('id') id: string, @Body('userId') userId: string) {
    const newPost = await this.blogPostService.createRepost(id, userId);

    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @Get('search')
  @ApiOperation(BlogPostAction.Search)
  @ApiResponse(BlogPostResponse.GetPosts)
  @ApiResponse(CommonResponse.BadRequest)
  public async search(
    @Query() query: BlogPostSearchQuery,
  ): Promise<BlogPostRdo[]> {
    const postEntities = await this.blogPostService.findByName(query);

    return postEntities.map((postEntity) =>
      fillDto(BlogPostRdo, postEntity.toPOJO()),
    );
  }

  @Patch(':id')
  @ApiOperation(BlogPostAction.Update)
  @ApiResponse(BlogPostResponse.PostUpdated)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(id, dto);
    return fillDto(BlogPostRdo, updatedPost.toPOJO());
  }
}
