import { z } from 'zod';
import { commonSchema } from '@/app/schema/common.schema';

const createWorkExperience = z.object({
  body: z.object({
    institutionName: z.string().trim().min(1, 'Institution name is required').max(200),
    role: z.string().trim().min(1, 'Role is required').max(200),
    link: z.string().url('Invalid URL').or(z.literal('')).default(''),
    certificate: z.string().url('Invalid URL').or(z.literal('')).default(''),
    joiningDate: z.string().min(1, 'Joining date is required'),
    endingDate: z.string().nullable().optional(),
    description: z.string().max(10000, 'Description is too long').default(''),
  }),
});

const updateWorkExperience = z.object({
  params: commonSchema.idSchema.shape.params,
  body: createWorkExperience.shape.body.partial(),
});

const listWorkExperience = z.object({
  query: commonSchema.paginationQuery,
});

export const workExperienceSchema = {
  createWorkExperience,
  updateWorkExperience,
  listWorkExperience,
};

export type IWorkExperience = z.infer<typeof createWorkExperience>['body'];
export type IListWorkExperience = z.infer<typeof listWorkExperience>['query'];
