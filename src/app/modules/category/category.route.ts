import { Router } from 'express';
import { categoryController } from './category.controller';
import { authMiddleware } from '@/app/middlewares/auth.middleware';
import validateRequest from '@/app/middlewares/validateRequest';
import { commonSchema } from '@/app/schema/common.schema';
import { categorySchema } from './category.schema';
import { defineRoutes } from '@/utils/defineRoutes';

const categoryRouter = Router();

defineRoutes(categoryRouter, [
  // GET /categories — public list (picker + public filters need it)
  {
    method: 'get',
    path: '/',
    middlewares: [validateRequest(categorySchema.listCategories)],
    handler: categoryController.getAllCategoriesHandler,
  },

  // GET /categories/:id — public
  {
    method: 'get',
    path: '/:id',
    middlewares: [validateRequest(commonSchema.idSchema)],
    handler: categoryController.getSingleCategoryHandler,
  },

  // POST /categories — owner only
  {
    method: 'post',
    path: '/',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(categorySchema.createCategory),
    ],
    handler: categoryController.createCategoryHandler,
  },

  // PUT /categories/:id — owner only
  {
    method: 'put',
    path: '/:id',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(categorySchema.updateCategory),
    ],
    handler: categoryController.updateCategoryHandler,
  },

  // DELETE /categories/:id — owner only (409 guard lives in the service)
  {
    method: 'delete',
    path: '/:id',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(commonSchema.idSchema),
    ],
    handler: categoryController.deleteCategoryHandler,
  },
]);

export default categoryRouter;
