export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

export const getPagination = (source: {
  page?: string | number;
  limit?: string | number;
}): PaginationOptions => {
  const page = Math.max(Number(source.page) || 1, 1);

  const limit = Math.max(Number(source.limit) || 10, 1);

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};
