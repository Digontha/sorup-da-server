import { z } from 'zod';
import { commonSchema } from '@/app/schema/common.schema';

const objectIdRegex = /^[a-f\d]{24}$/i;

const createBlog = z.object({
  body: z.object({
    title: z.string().trim().min(1, 'Title is required').max(300),
    images: z.array(z.string().url('Image must be a valid URL')).default([]),
    author: z.string().max(200, 'Author is too long').default(''),
    excerpt: z.string().max(2000, 'Excerpt is too long').default(''),
    category: z.string().regex(objectIdRegex, 'Invalid category id').nullable().optional(),
    blogLink: z.string().url('Invalid URL').or(z.literal('')).default(''),
    articleContent: z.string().max(200000, 'Article content is too long').default(''),
  }),
});

const updateBlog = z.object({
  params: commonSchema.idSchema.shape.params,
  body: createBlog.shape.body.partial(),
});

const getBlogBySlug = z.object({
  params: z.object({ slug: z.string().trim().min(1, 'Slug is required').max(300) }),
});

const listBlogs = z.object({
  query: commonSchema.paginationQuery.extend({
    category: z.string().regex(objectIdRegex, 'Invalid category id').optional(),
  }),
});

export const blogSchema = {
  createBlog,
  updateBlog,
  getBlogBySlug,
  listBlogs,
};

export type IBlog = z.infer<typeof createBlog>['body'];
export type IListBlogs = z.infer<typeof listBlogs>['query'];
