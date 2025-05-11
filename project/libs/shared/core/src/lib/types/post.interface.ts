import { PostType } from './post-type.enum';
import { PostState } from './post-state.enum';

export interface Post {
  id?: string;
  name: string;
  text: string;
  postType: PostType;
  postState: PostState;
  userId: string;
  isRepost?: boolean;
  originalId?: string;
  originalUserId?: string;
  tags?: string[];
  likeCount?: number;
  commentCount?: number;
  url?: string;
  preview?: string;
  quoteText?: string;
  quoteAuthor?: string;
  description?: string;
  createDate?: Date;
  publicationDate?: Date;
}
