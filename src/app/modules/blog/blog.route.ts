import { Router } from 'express';
import { blogController } from './blog.controller';
import { authMiddleware } from '@/app/middlewares/auth.middleware';
import validateRequest from '@/app/middlewares/validateRequest';
import { commonSchema } from '@/app/schema/common.schema';
import { blogSchema } from './blog.schema';
import { defineRoutes } from '@/utils/defineRoutes';

const blogRouter = Router();

defineRoutes(blogRouter, [
  // GET /blogs — public list (no static subpaths in this module)
  {
    method: 'get',
    path: '/',
    middlewares: [validateRequest(blogSchema.listBlogs)],
    handler: blogController.getAllBlogsHandler,
  },

  // GET /blogs/slug/:slug — MUST come before /blogs/:id
  {
    method: 'get',
    path: '/slug/:slug',
    middlewares: [validateRequest(blogSchema.getBlogBySlug)],
    handler: blogController.getBlogBySlugHandler,
  },

  // GET /blogs/:id — public
  {
    method: 'get',
    path: '/:id',
    middlewares: [validateRequest(commonSchema.idSchema)],
    handler: blogController.getSingleBlogHandler,
  },

  // POST /blogs — owner only
  {
    method: 'post',
    path: '/',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(blogSchema.createBlog),
    ],
    handler: blogController.createBlogHandler,
  },

  // PUT /blogs/:id — owner only
  {
    method: 'put',
    path: '/:id',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(blogSchema.updateBlog),
    ],
    handler: blogController.updateBlogHandler,
  },

  // DELETE /blogs/:id — owner only
  {
    method: 'delete',
    path: '/:id',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(commonSchema.idSchema),
    ],
    handler: blogController.deleteBlogHandler,
  },
]);

export default blogRouter;
