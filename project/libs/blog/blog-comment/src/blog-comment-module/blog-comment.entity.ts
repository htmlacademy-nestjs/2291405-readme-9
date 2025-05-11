import { Comment, Entity, StorableEntity } from '@project/core';

export class BlogCommentEntity extends Entity implements StorableEntity<Comment>
{
  public postId: string;
  public userId: string;
  public text: string;
  public createDate?: Date;

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: Comment): void {
    if (!comment) {
      return;
    }
    this.id = comment.id || '';
    this.postId = comment.postId;
    this.userId = comment.userId;
    this.text = comment.text;
    this.createDate = comment.createDate || undefined;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      text: this.text,
      createDate: this.createDate,
    };
  }
}
