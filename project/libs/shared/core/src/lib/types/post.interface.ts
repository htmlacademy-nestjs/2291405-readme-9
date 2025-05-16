import { PostType } from './post-type.enum';
import { PostState } from './post-state.enum';


export interface BasePost {
  id?: string;
  postType: PostType;
  postState: PostState;
  userId: string;
  isRepost: boolean;
  originalId?: string;
  originalUserId?: string;
  tags?: string[];
  likeCount?: number;
  commentCount?: number;
  createDate: Date;
  publicationDate: Date;
}

export interface VideoPost extends BasePost {
  name: string;
  url: string;
}

export interface TextPost extends BasePost {
  name: string;
  preview: string;
  text: string;
}

export interface QuotePost extends BasePost {
  quoteText: string;
  quoteAuthor: string;
}

export interface PhotoPost extends BasePost {
  photo: string;
}

export interface LinkPost extends BasePost {
  url: string;
  description: string;
}

export interface Post {
  id?: string;
  name : string;
  url?: string;
  preview?: string;
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
  createDate: Date;
  publicationDate: Date;
  quoteAuthor?: string;
  quoteText?: string;
  photo?: string;
  description?: string;
}
