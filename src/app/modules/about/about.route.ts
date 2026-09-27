import { Router } from 'express';
import { aboutController } from './about.controller';
import { authMiddleware } from '@/app/middlewares/auth.middleware';
import validateRequest from '@/app/middlewares/validateRequest';
import { aboutSchema } from './about.schema';
import { defineRoutes } from '@/utils/defineRoutes';

const aboutRouter = Router();

defineRoutes(aboutRouter, [
  // GET /about — public (singleton, no /:id routes exist in this module)
  {
    method: 'get',
    path: '/',
    handler: aboutController.getAboutHandler,
  },

  // PUT /about — owner only
  {
    method: 'put',
    path: '/',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(aboutSchema.updateAbout),
    ],
    handler: aboutController.updateAboutHandler,
  },
]);

export default aboutRouter;
