import { Request } from 'express';

export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

export const getPagination = (req: Request): PaginationOptions => {
  const page = Math.max(Number(req.query.page) || 1, 1);

  const limit = Math.max(Number(req.query.limit) || 10, 1);

  const skip = (page - 1) * limit;

  return {
    page,

    limit,

    skip,
  };
};
