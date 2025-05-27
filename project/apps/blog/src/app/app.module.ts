import { Module } from '@nestjs/common';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogLikeModule } from '@project/blog-like';
import { BlogPostModule } from '@project/blog-post';

@Module({
  imports: [BlogPostModule, BlogLikeModule, BlogCommentModule],
})
export class AppModule {}
