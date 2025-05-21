import { HttpStatus } from '@nestjs/common';
import { BlogPostRdo } from '../rdo/blog-post.rdo';


export const BlogPostResponse = {
  PostCreated: {
    type: BlogPostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created',
  },
  PostUpdated: {
    type: BlogPostRdo,
    status: HttpStatus.OK,
    description: 'The post has been successfully updated',
  },
  PostDeleted: {
    status: HttpStatus.OK,
    description: 'The post has been successfully deleted',
  },
  PostFound: {
    type: BlogPostRdo,
    status: HttpStatus.OK,
    description: 'Post found',
  },
  PostNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  }
} as const;