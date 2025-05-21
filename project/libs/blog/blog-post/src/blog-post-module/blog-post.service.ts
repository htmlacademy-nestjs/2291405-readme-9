import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostRepository } from './blog-post.repository';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { CreateQuotePostDto } from '../dto/create-quote-post.dto';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { CreateLinkPostDto } from '../dto/create-link-post.dto';
import { BlogPostProperty } from '../swagger/blog-post-property';


@Injectable()
export class BlogPostService {

  constructor(
    private readonly blogPostRepository: BlogPostRepository,  
    private readonly blogPostFactory: BlogPostFactory  
  ) {}


  public async createVideoPost(dto: CreateVideoPostDto): Promise<BlogPostEntity>
  {
      const newPost = this.blogPostFactory.createVideoPost({
      ...dto,
      tags: this.checkTags(dto.tags),
    });

    return await this.blogPostRepository.save(newPost);
  }

  public async createTextPost(dto: CreateTextPostDto): Promise<BlogPostEntity>
  {
    const newPost = this.blogPostFactory.createTextPost({
      ...dto,
      tags: this.checkTags(dto.tags),
    });

    return await this.blogPostRepository.save(newPost);
  }

  public async createQuotePost(dto: CreateQuotePostDto): Promise<BlogPostEntity>
  {
    const newPost = this.blogPostFactory.createQuotePost({
      ...dto,
      tags: this.checkTags(dto.tags),
    });

    return await this.blogPostRepository.save(newPost);
  }

  public async createPhotoPost(dto: CreatePhotoPostDto): Promise<BlogPostEntity>
  {
    const newPost = this.blogPostFactory.createPhotoPost({
      ...dto,
      tags: this.checkTags(dto.tags),
    });

    return await this.blogPostRepository.save(newPost);
  }

  public async createLinkPost(dto: CreateLinkPostDto): Promise<BlogPostEntity>
  {
    const newPost = this.blogPostFactory.createLinkPost({
      ...dto,
      tags: this.checkTags(dto.tags),
    });
    
    return await this.blogPostRepository.save(newPost);
  }

  public async getPost(id: string): Promise<BlogPostEntity | null>
  {
    return this.blogPostRepository.findById(id);
  }

  public async deletePost(id: string): Promise<void>
  {
    try {
      await this.blogPostRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPosts(): Promise<BlogPostEntity[]> {
    throw new Error('Not implemented');
  }

  public async createRepostPublication(id: string, userId: string): Promise<BlogPostEntity>
  {
    throw new Error('Not implemented');
  }

  public async getPostByTitle(title: string): Promise<BlogPostEntity>
  {
    throw new Error('Not implemented');
  }

  private checkTags(tags: string[]): string[] {
    if (tags && tags.length > 0) {
      const uniqueTags = [...new Set(tags)];
      if (uniqueTags.length > BlogPostProperty.Tags.Validate.MaxCount) {
        throw new BadRequestException(
          BlogPostProperty.Tags.Validate.MessageCount
        );
      }

      const result = uniqueTags.map((tag): string => {
        if (!BlogPostProperty.Tags.Validate.RegExp.test(tag)) {
          throw new BadRequestException(BlogPostProperty.Tags.Validate.Message);
        }
        return tag.toLowerCase();
      });
      
      return result;
    }

    return [];
  }
}
