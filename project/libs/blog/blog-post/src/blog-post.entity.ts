import { Entity, Post, PostType, PostState, StorableEntity} from '@project/core';


export class BlogPostEntity extends Entity implements StorableEntity<Post> {
    public name: string;
    public text: string;
    public postType: PostType;
    public postState: PostState;
    public userId: string;
    public isRepost: boolean;
    public originalId?: string;
    public originalUserId?: string;
    public tags: string[];
    public likeCount: number;
    public commentCount: number;
    public url?: string;
    public preview?: string;
    public quoteText?: string;
    public quoteAuthor?: string;
    public description?: string;
    public createDate: Date;
    public publicationDate: Date;

    constructor(post?: Post) {
      super();
      this.populate(post);
    }

    public populate(post?: Post): void {
      if (!post) {
        return;
      }
      this.id = post.id ?? '';
      this.name = post.name;
      this.text = post.text;
      this.postType = post.postType;
      this.userId = post.userId;
      this.isRepost = this.originalId || null ? true : false;
      this.originalId = post.originalId || undefined;
      this.originalUserId = post.originalUserId || undefined;
      this.tags = post.tags ?? [];
      this.postState = !post.publicationDate || post.publicationDate > new Date() ? PostState.Draft: PostState.Published;
      this.createDate = post.createDate ?? new Date();
      this.publicationDate = post.publicationDate ?? new Date();
      this.likeCount = post.likeCount ?? 0;
      this.commentCount = post.commentCount ?? 0;
      this.url = post.url || undefined;
      this.preview = post.preview;
      this.quoteAuthor = post.quoteAuthor || undefined;
      this.quoteText = post.quoteText || undefined;
      this.description = post.description || undefined;
    }

    public toPOJO(): Post {
      return {
        id: this.id,
        name: this.name,
        text: this.text,
        postType: this.postType,
        userId: this.userId,
        isRepost: this.originalId || null ? true : false,
        originalId: this.originalId,
        originalUserId: this.originalUserId,
        tags: this.tags,
        postState:
          !this.publicationDate || this.publicationDate > new Date()
            ? PostState.Draft
            : PostState.Published,
        createDate: this.createDate,
        publicationDate: this.publicationDate,
        likeCount: this.likeCount,
        commentCount: this.commentCount,
        url: this.url,
        preview: this.preview,
        quoteText: this.quoteText,
        quoteAuthor: this.quoteAuthor,
        description: this.description,
      };
  }
}
