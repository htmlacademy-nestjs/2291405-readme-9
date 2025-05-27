import { HttpStatus } from '@nestjs/common';

export const BlogLikeResponse = {
  SetLike: {
    status: HttpStatus.OK,
    description: 'Post liked',
  },
  DelLike: {
    status: HttpStatus.OK,
    description: 'Like deleted',
  },
  LikeExists: {
    status: HttpStatus.CONFLICT,
    description: 'User has already liked this post',
  },
  LikeNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: 'User not liked this post',
  },
} as const;
