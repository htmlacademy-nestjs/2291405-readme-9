import { ConflictException, Injectable } from '@nestjs/common';
import { Like } from '@project/core';
import { BlogLikeEntity } from './blog-like.entity';
import { BlogLikeRepository } from './blog-like.repository';

@Injectable()
export class BlogLikeService {
  constructor(private readonly blogLikeRepository: BlogLikeRepository) {}

  public async appendLike(like: Like): Promise<void> {
    const isLikeExists = await this.blogLikeRepository.isLikeExists(like);
    if (isLikeExists) {
      throw new ConflictException('User has already liked this post');
    }
    const newLike = new BlogLikeEntity(like);
    await this.blogLikeRepository.save(newLike);
  }

  public async removeLike(like: Like): Promise<void> {
    const isLikeExists = await this.blogLikeRepository.isLikeExists(like);
    if (!isLikeExists) {
      throw new ConflictException('User not liked this post');
    }
    await this.blogLikeRepository.deleteByIds(like);
  }
}
