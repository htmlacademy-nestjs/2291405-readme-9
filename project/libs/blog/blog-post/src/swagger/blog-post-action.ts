export const BlogPostAction = {
  CreateVideo: { summary: 'Добавление новой публикации с типом "Видео"' },
  CreateText: { summary: 'Добавление новой публикации с типом "Текст"' },
  CreateQuote: { summary: 'Добавление новой публикации с типом "Цитаты' },
  CreatePhoto: { summary: 'Добавление новой публикации с типом "Фото"' },
  CreateLink: { summary: 'Добавление новой публикации с типом "Ссылка"' },
  Delete: { summary: 'Удаление публикации' },
} as const;
