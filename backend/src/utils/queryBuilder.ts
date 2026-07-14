import { Request } from "express";

import { SortOrder } from "mongoose";

export const getSorting = (req: Request): Record<string, SortOrder> => {
  const sortBy = String(req.query.sortBy || "createdAt");

  const order: SortOrder =
    String(req.query.order || "desc").toLowerCase() === "asc" ? 1 : -1;

  return {
    [sortBy]: order,
  };
};
