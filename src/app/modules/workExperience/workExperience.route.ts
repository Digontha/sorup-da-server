import { Router } from 'express';
import { workExperienceController } from './workExperience.controller';
import { authMiddleware } from '@/app/middlewares/auth.middleware';
import validateRequest from '@/app/middlewares/validateRequest';
import { commonSchema } from '@/app/schema/common.schema';
import { workExperienceSchema } from './workExperience.schema';
import { defineRoutes } from '@/utils/defineRoutes';

const workExperienceRouter = Router();

defineRoutes(workExperienceRouter, [
  // GET /work-experiences — public list (no static subpaths in this module)
  {
    method: 'get',
    path: '/',
    middlewares: [validateRequest(workExperienceSchema.listWorkExperience)],
    handler: workExperienceController.getAllWorkExperiencesHandler,
  },

  // GET /work-experiences/:id — public
  {
    method: 'get',
    path: '/:id',
    middlewares: [validateRequest(commonSchema.idSchema)],
    handler: workExperienceController.getSingleWorkExperienceHandler,
  },

  // POST /work-experiences — owner only
  {
    method: 'post',
    path: '/',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(workExperienceSchema.createWorkExperience),
    ],
    handler: workExperienceController.createWorkExperienceHandler,
  },

  // PUT /work-experiences/:id — owner only
  {
    method: 'put',
    path: '/:id',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(workExperienceSchema.updateWorkExperience),
    ],
    handler: workExperienceController.updateWorkExperienceHandler,
  },

  // DELETE /work-experiences/:id — owner only
  {
    method: 'delete',
    path: '/:id',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(commonSchema.idSchema),
    ],
    handler: workExperienceController.deleteWorkExperienceHandler,
  },
]);

export default workExperienceRouter;
