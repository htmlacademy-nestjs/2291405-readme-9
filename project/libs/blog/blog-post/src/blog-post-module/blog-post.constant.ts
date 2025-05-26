import { SortDirection, SortType } from '@project/core';

export const BlogPostError = {
  PostNotFound: 'Post not found',
  NotAllow: 'Post is not yours',
  RepostExist: 'You already reposted this post',
  PostIsDraft: 'Post state is not is published',
} as const;

export const BlogPostPaginationDefault = {
  PostCountLimit: 25,
  PageCurrent: 1,
  PostCountSearch: 20,
} as const;

export const BlogPostSortDefault = {
  Direction: SortDirection.DESC,
  Type: SortType.PUBLICATION_DATE,
} as const;
