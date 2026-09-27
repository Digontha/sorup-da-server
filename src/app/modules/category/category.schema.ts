import { z } from 'zod';
import { commonSchema } from '@/app/schema/common.schema';
import { CATEGORY_APPLIES_TO } from './category.constant';

const categoryBody = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  appliesTo: z.enum(CATEGORY_APPLIES_TO),
});

const createCategory = z.object({
  body: categoryBody,
});

const updateCategory = z.object({
  params: commonSchema.idSchema.shape.params,
  body: categoryBody.partial(),
});

const listCategories = z.object({
  query: commonSchema.paginationQuery.extend({
    appliesTo: z.enum(CATEGORY_APPLIES_TO).optional(),
  }),
});

export const categorySchema = {
  createCategory,
  updateCategory,
  listCategories,
};

export type ICategory = z.infer<typeof categoryBody>;
export type IListCategories = z.infer<typeof listCategories>['query'];
