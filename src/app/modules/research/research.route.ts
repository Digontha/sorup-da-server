import { Router } from 'express';
import { researchController } from './research.controller';
import { authMiddleware } from '@/app/middlewares/auth.middleware';
import validateRequest from '@/app/middlewares/validateRequest';
import { commonSchema } from '@/app/schema/common.schema';
import { researchSchema } from './research.schema';
import { defineRoutes } from '@/utils/defineRoutes';

const researchRouter = Router();

defineRoutes(researchRouter, [
  // GET /research — public list (no static subpaths in this module)
  {
    method: 'get',
    path: '/',
    middlewares: [validateRequest(researchSchema.listResearch)],
    handler: researchController.getAllResearchHandler,
  },

  // GET /research/:id — public
  {
    method: 'get',
    path: '/:id',
    middlewares: [validateRequest(commonSchema.idSchema)],
    handler: researchController.getSingleResearchHandler,
  },

  // POST /research — owner only
  {
    method: 'post',
    path: '/',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(researchSchema.createResearch),
    ],
    handler: researchController.createResearchHandler,
  },

  // PUT /research/:id — owner only
  {
    method: 'put',
    path: '/:id',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(researchSchema.updateResearch),
    ],
    handler: researchController.updateResearchHandler,
  },

  // DELETE /research/:id — owner only
  {
    method: 'delete',
    path: '/:id',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(commonSchema.idSchema),
    ],
    handler: researchController.deleteResearchHandler,
  },
]);

export default researchRouter;
