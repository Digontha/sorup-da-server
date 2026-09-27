import { z } from 'zod';
import { commonSchema } from '@/app/schema/common.schema';

const objectIdRegex = /^[a-f\d]{24}$/i;

const createProject = z.object({
  body: z.object({
    title: z.string().trim().min(1, 'Title is required').max(300),
    problemStatement: z.string().max(10000, 'Problem statement is too long').default(''),
    role: z.string().max(500, 'Role is too long').default(''),
    images: z.array(z.string().url('Image must be a valid URL')).default([]),
    tools: z.array(z.string().trim().min(1).max(100)).default([]),
    content: z.string().max(100000, 'Content is too long').default(''),
    category: z.string().regex(objectIdRegex, 'Invalid category id').nullable().optional(),
  }),
});

const updateProject = z.object({
  params: commonSchema.idSchema.shape.params,
  body: createProject.shape.body.partial(),
});

const listProjects = z.object({
  query: commonSchema.paginationQuery.extend({
    category: z.string().regex(objectIdRegex, 'Invalid category id').optional(),
  }),
});

export const projectSchema = {
  createProject,
  updateProject,
  listProjects,
};

export type IProject = z.infer<typeof createProject>['body'];
export type IListProjects = z.infer<typeof listProjects>['query'];
