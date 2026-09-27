import { z } from 'zod';
import { commonSchema } from '@/app/schema/common.schema';

const createResearch = z.object({
  body: z.object({
    title: z.string().trim().min(1, 'Title is required').max(300),
    excerpt: z.string().max(2000, 'Excerpt is too long').default(''),
    citation: z.string().max(100000, 'Citation is too long').default(''),
    publishDate: z.string().min(1, 'Publish date is required'),
  }),
});

const updateResearch = z.object({
  params: commonSchema.idSchema.shape.params,
  body: createResearch.shape.body.partial(),
});

const listResearch = z.object({
  query: commonSchema.paginationQuery,
});

export const researchSchema = {
  createResearch,
  updateResearch,
  listResearch,
};

export type IResearch = z.infer<typeof createResearch>['body'];
export type IListResearch = z.infer<typeof listResearch>['query'];
