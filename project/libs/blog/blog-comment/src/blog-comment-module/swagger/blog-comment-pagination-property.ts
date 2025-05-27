export const PaginationProperty = {
  CurrentPage: {
    Description: {
      description: 'Current page',
      example: 1,
      required: false,
    },
  },
  TotalPages: {
    Description: {
      description: 'Total pages',
      example: 10,
    },
  },
  TotalItems: {
    Description: {
      description: 'Total items',
      example: 200,
    },
  },
  ItemsPerPage: {
    Description: {
      description: 'Items count per page',
      example: 20,
    },
  },
} as const;
