import { Router } from 'express';
import { homeController } from './home.controller';
import { authMiddleware } from '@/app/middlewares/auth.middleware';
import validateRequest from '@/app/middlewares/validateRequest';
import { homeSchema } from './home.schema';
import { defineRoutes } from '@/utils/defineRoutes';

const homeRouter = Router();

defineRoutes(homeRouter, [
  // GET /home — public (singleton, no /:id routes exist in this module)
  {
    method: 'get',
    path: '/',
    handler: homeController.getHomeHandler,
  },

  // PUT /home — owner only
  {
    method: 'put',
    path: '/',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(homeSchema.updateHome),
    ],
    handler: homeController.updateHomeHandler,
  },
]);

export default homeRouter;
