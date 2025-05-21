import { Body, Controller, Delete, Get, HttpCode, Param, Post} from '@nestjs/common';

import { CreateVideoPostDto } from '../dto/create-video-post.dto';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { CreateLinkPostDto } from '../dto/create-link-post.dto';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { CreateQuotePostDto } from '../dto/create-quote-post.dto';
import { BlogPostService } from './blog-post.service';
import { BlogPostRdo } from '../rdo/blog-post.rdo';
import { fillDto } from '@project/helpers';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BlogPostResponse } from '../swagger/blog-post-response';
import { BlogPostAction } from '../swagger/blog-post-action';
import { CommonResponse } from '@project/core';



@ApiTags('Blog')
@Controller('blog')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ) {}

  @Post('create/video')
  @ApiOperation(BlogPostAction.CreateVideo)
  @ApiResponse(BlogPostResponse.PostCreated)
  @ApiResponse(CommonResponse.BadRequest)
  public async createVideo(@Body() dto: CreateVideoPostDto): Promise<BlogPostRdo> {
    const newPost = await this.blogPostService.createVideoPost(dto);
    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @Post('create/text')
  @ApiOperation(BlogPostAction.CreateText)
  @ApiResponse(BlogPostResponse.PostCreated)
  @ApiResponse(CommonResponse.BadRequest)
  public async createText(@Body() dto: CreateTextPostDto): Promise<BlogPostRdo> {
    const newPost = await this.blogPostService.createTextPost(dto);
    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @Post('create/quote')
  @ApiOperation(BlogPostAction.CreateQuote)
  @ApiResponse(BlogPostResponse.PostCreated)
  @ApiResponse(CommonResponse.BadRequest)
  public async createQuote(@Body() dto: CreateQuotePostDto): Promise<BlogPostRdo>  {
    const newPost = await this.blogPostService.createQuotePost(dto);
    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @Post('create/photo')
  @ApiOperation(BlogPostAction.CreatePhoto)
  @ApiResponse(BlogPostResponse.PostCreated)
  @ApiResponse(CommonResponse.BadRequest)
  public async createPhoto(@Body() dto: CreatePhotoPostDto): Promise<BlogPostRdo>  {
    const newPost = await this.blogPostService.createPhotoPost(dto);
    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @Post('create/link')
  @ApiOperation(BlogPostAction.CreateLink)
  @ApiResponse(BlogPostResponse.PostCreated)
  @ApiResponse(CommonResponse.BadRequest)
  public async createLink(@Body() dto: CreateLinkPostDto): Promise<BlogPostRdo>  {
    const newPost = await this.blogPostService.createLinkPost(dto);
    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    throw new Error('Not implemented');
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
  public async getAll() {
    throw new Error('Not implemented');
  }

  @Post('/repost/:id/:userId')
  public async repost(@Param('id') id: string, @Param('userId') userId: string) {
      throw new Error('Not implemented');
  }

  @Post('search')
  public async findByName() {
    throw new Error('Not implemented');
  }
}
