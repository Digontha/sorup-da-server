import { Router } from 'express';
import { projectController } from './project.controller';
import { authMiddleware } from '@/app/middlewares/auth.middleware';
import validateRequest from '@/app/middlewares/validateRequest';
import { commonSchema } from '@/app/schema/common.schema';
import { projectSchema } from './project.schema';
import { defineRoutes } from '@/utils/defineRoutes';

const projectRouter = Router();

defineRoutes(projectRouter, [
  // GET /projects — public list (no static subpaths in this module)
  {
    method: 'get',
    path: '/',
    middlewares: [validateRequest(projectSchema.listProjects)],
    handler: projectController.getAllProjectsHandler,
  },

  // GET /projects/:id — public
  {
    method: 'get',
    path: '/:id',
    middlewares: [validateRequest(commonSchema.idSchema)],
    handler: projectController.getSingleProjectHandler,
  },

  // POST /projects — owner only
  {
    method: 'post',
    path: '/',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(projectSchema.createProject),
    ],
    handler: projectController.createProjectHandler,
  },

  // PUT /projects/:id — owner only
  {
    method: 'put',
    path: '/:id',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(projectSchema.updateProject),
    ],
    handler: projectController.updateProjectHandler,
  },

  // DELETE /projects/:id — owner only
  {
    method: 'delete',
    path: '/:id',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(commonSchema.idSchema),
    ],
    handler: projectController.deleteProjectHandler,
  },
]);

export default projectRouter;
