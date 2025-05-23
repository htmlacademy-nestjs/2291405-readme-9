import { PostState, PostType } from '@prisma/blog-client';

export const BlogPostProperty = {
  Id: {
    Description: {
      description: 'The unique post ID',
      example: '2f31b19b-97eb-4305-877a-0b9be7faca8f',
    },
  },
  PostType: {
    Description: {
      description: 'The post type',
      enum: PostType,
      example: PostType.VIDEO,
      required: false,
    },
  },
  UserId: {
    Description: {
      description: 'User ID of post author',
      example: '2f31b19b-97eb-4305-877a-0b9be7faca8f',
      required: false,
    },
    Validate: {
      Message: 'AuthorId should be valid UUID',
    },
  },
  IsRepost: {
    Description: {
      description: 'The post is repost attribute',
      example: 'true',
    },
  },
  OriginalId: {
    Description: {
      description: 'The reposted post id',
      required: false,
      example: '2f31b19b-97eb-4305-877a-0b9be7faca8f',
    },
  },
  OriginalUserId: {
    Description: {
      description: 'The reposted post author id',
      example: '2f31b19b-97eb-4305-877a-0b9be7faca8f',
    },
  },
  PostState: {
    Description: {
      description: 'The post state',
      enum: PostState,
      example: PostState.PUBLISHED,
    },
  },
  PublicationDate: {
    Description: {
      description: 'The post publish date',
      example: '2025-05-05',
      required: false,
    },
  },
  CreateDate: {
    Description: {
      description: 'The post create date',
      example: '2025-05-05',
      required: false,
    },
  },
  Tags: {
    Description: {
      description: 'Array of post tags',
      example: ['tag-1', 'tag-2'],
      required: false,
    },
    Validate: {
      MaxCount: 8,
      RegExp: /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я0-9-]{2,9}$/,
      MessageCount: 'The number of tags should be no more than 8',
      Message:
        'The tag must contain letters, numbers, and dashes, start with a letter, and contain at least 3 and no more than 10 characters.',
    },
  },
  Name: {
    Description: {
      description: 'The post title for types: Video and Text',
      required: false,
      example: 'Title post or type Video',
    },
    Validate: {
      MinLength: 20,
      MaxLength: 50,
      Message:
        'The field "name" be at least 20 and no more than 50 characters long',
    },
  },
  Url: {
    Description: {
      description: 'The post url for types: Video, Photo and Link',
      required: false,
      example: 'https://site.ru/photo.jpeg',
    },
  },
  Preview: {
    Description: {
      description: 'The post preview text for type: Text',
      required: false,
      example: 'Preview text post or type Text Preview text post or type Text',
    },
    Validate: {
      MinLength: 50,
      MaxLength: 255,
      Message:
        'The field "preview" be at least 50 and no more than 255 characters long',
    },
  },
  Text: {
    Description: {
      description: 'The post text for type: Text',
      required: false,
      example:
        'Text post Text post Text post Text post Text post Text post Text post Text post Text post Text post Text post',
    },
    Validate: {
      MinLength: 100,
      MaxLength: 1024,
      Message:
        'The field "text" be at least 100 and no more than 1024 characters long',
    },
  },
  QuoteText: {
    Description: {
      description: 'The post quote text for type: Quote',
      required: false,
      example: 'Quote text quote text',
    },
    Validate: {
      MinLength: 20,
      MaxLength: 300,
      Message:
        'The field "quoteText" be at least 20 and no more than 300 characters long',
    },
  },
  QuoteAuthor: {
    Description: {
      description: 'The post quote author for type: Quote',
      required: false,
      example: 'Quote author',
    },
    Validate: {
      MinLength: 3,
      MaxLength: 50,
      Message:
        'The field "quoteAuthor" be at least 3 and no more than 50 characters long',
    },
  },
  Photo: {
    Description: {
      description: 'The post image file for type: Photo',
      required: false,
      type: 'string',
      format: 'binary',
    },
    Validate: {
      FileExtRegExp: /\.(jpg|png)$/,
      MaxSize: 1024 * 1024,
      Message: 'It is allowed to upload a jpg or png image (size <= 1 Mb)',
    },
  },
  Description: {
    Description: {
      description: 'The post link description for type: Link',
      required: false,
      example: 'link description',
    },
    Validate: {
      MinLength: 1,
      MaxLength: 300,
      Message: 'The field "description" be at no more than 300 characters long',
    },
  },
  LikeCount: {
    Description: {
      description: 'The post likes count',
      example: 5,
    },
  },
  CommentCount: {
    Description: {
      description: 'The post comments count',
      example: 5,
    },
  },
  Comments: {
    Description: {
      description: 'Comments post',
    },
  },
} as const;
