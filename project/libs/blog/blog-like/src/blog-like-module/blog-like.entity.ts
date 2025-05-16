import { Entity, Like, StorableEntity } from '@project/core';

export class BlogLikeEntity extends Entity implements StorableEntity<Like> {
  public userId!: string;
  public postId!: string;

  constructor(like?: Like) {
    super();
    this.populate(like);
  }

  public populate(like?: Like): void {
    if (!like) {
      return;
    }

    this.userId = like.userId;
    this.postId = like.postId;
  }

  public toPOJO(): Like {
    return {
      userId: this.userId,
      postId: this.postId,
    };
  }
}
