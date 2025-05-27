export const BlogCommentProperty = {
  Id: {
    Description: {
      description: 'The unique ID',
      example: 'd8e92f73-c962-4e2a-aca4-d36fa4030597',
    },
  },
  Text: {
    Description: {
      description: 'Text post comment',
      required: true,
      example: 'Text comment',
    },
    Validate: {
      MinLength: 10,
      MaxLength: 300,
      Message:
        'The text comment be at least 10 and no more than 300 characters long',
    },
  },
  CommentList: {
    Description: {
      description: 'Comment list',
      example: '[{commentObject1}, {commentObject2}]',
      isArray: true,
    },
  },
} as const;
