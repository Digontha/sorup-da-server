import { z } from 'zod';

const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;

// Mongo ObjectId params guard — merged into every :id schema
const idSchema = z.object({
  params: z.object({ id: z.string().regex(OBJECT_ID_REGEX, 'Invalid ID format') }),
});

// Shared pagination/search query base — extended by each list schema
const paginationQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
});

export const commonSchema = { idSchema, paginationQuery };

export type PaginationQuery = z.infer<typeof paginationQuery>;
