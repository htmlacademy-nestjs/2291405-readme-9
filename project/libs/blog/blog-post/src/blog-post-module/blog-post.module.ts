import { Module } from '@nestjs/common';
import { PrismaBlogClientModule } from '@project/blog-model';
import { BlogPostController } from './blog-post.controller';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostService } from './blog-post.service';

@Module({
  imports: [PrismaBlogClientModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository, BlogPostFactory],
  exports: [BlogPostService],
})
export class BlogPostModule {}
