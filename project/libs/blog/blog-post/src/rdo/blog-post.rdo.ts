import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { PostState, PostType } from '@project/core';
import { BlogPostProperty } from '../swagger/blog-post-property';
import { Comment } from '@project/core';


export class BlogPostRdo {
  @ApiProperty(BlogPostProperty.Id.Description)
  @Expose()
  public id: string;

  @ApiProperty(BlogPostProperty.PostType.Description)
  @Expose()
  public postType: PostType;

  @ApiProperty(BlogPostProperty.UserId.Description)
  @Expose()
  public authorId: string;

  @ApiProperty(BlogPostProperty.IsRepost.Description)
  @Expose()
  public isRepost: boolean;

  @ApiProperty(BlogPostProperty.OriginalId.Description)
  @Expose()
  public repostId: string;

  @ApiProperty(BlogPostProperty.OriginalUserId.Description)
  @Expose()
  public repostAuthorId: string;

  @ApiProperty(BlogPostProperty.Tags.Description)
  @Expose()
  public tags: string[];

  @ApiProperty(BlogPostProperty.CreateDate.Description)
  @Expose()
  public createDate: Date;

  @ApiProperty(BlogPostProperty.PostState.Description)
  @Expose()
  public state: PostState;

  @ApiProperty(BlogPostProperty.PublicationDate.Description)
  @Expose()
  public publicationDate: Date;

  @ApiProperty(BlogPostProperty.LikeCount.Description)
  @Expose()
  public likeCount: number;

  @ApiProperty(BlogPostProperty.CommentCount.Description)
  @Expose()
  public commentCount: number;

  @ApiProperty(BlogPostProperty.Name.Description)
  @Expose()
  public name: string;

  @ApiProperty(BlogPostProperty.Url.Description)
  @Expose()
  public url: string;

  @ApiProperty(BlogPostProperty.Preview.Description)
  @Expose()
  public preview: string;

  @ApiProperty(BlogPostProperty.Text.Description)
  @Expose()
  public text: string;

  @ApiProperty(BlogPostProperty.QuoteText.Description)
  @Expose()
  public quoteText: string;

  @ApiProperty(BlogPostProperty.QuoteAuthor.Description)
  @Expose()
  public quoteAuthor: string;

  @ApiProperty(BlogPostProperty.Description.Description)
  @Expose()
  public description: string;

  @ApiProperty(BlogPostProperty.Comments.Description)
  @Expose()
  public comments: Comment[];
}