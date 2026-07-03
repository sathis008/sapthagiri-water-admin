import { Response } from 'express';

interface Pagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export const successResponse = (
  res: Response,

  message: string,

  data: any,

  pagination?: Pagination
) => {
  return res.status(200).json({
    success: true,

    message,

    data,

    pagination,
  });
};

export const errorResponse = (
  res: Response,

  status: number,

  message: string
) => {
  return res.status(status).json({
    success: false,

    message,
  });
};
