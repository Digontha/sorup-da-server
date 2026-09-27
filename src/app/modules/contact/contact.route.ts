import { Router } from 'express';
import { contactController } from './contact.controller';
import { authMiddleware } from '@/app/middlewares/auth.middleware';
import validateRequest from '@/app/middlewares/validateRequest';
import { commonSchema } from '@/app/schema/common.schema';
import { contactSchema } from './contact.schema';
import { defineRoutes } from '@/utils/defineRoutes';

const contactRouter = Router();

defineRoutes(contactRouter, [
  // POST /contacts — PUBLIC visitor submission (no auth, no PUT — read + delete only)
  {
    method: 'post',
    path: '/',
    middlewares: [validateRequest(contactSchema.createContact)],
    handler: contactController.createContactHandler,
  },

  // GET /contacts — owner inbox
  {
    method: 'get',
    path: '/',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(contactSchema.listContacts),
    ],
    handler: contactController.getAllContactsHandler,
  },

  // GET /contacts/:id — owner
  {
    method: 'get',
    path: '/:id',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(commonSchema.idSchema),
    ],
    handler: contactController.getSingleContactHandler,
  },

  // DELETE /contacts/:id — owner
  {
    method: 'delete',
    path: '/:id',
    middlewares: [
      authMiddleware.requireAuth,
      authMiddleware.requireAdmin,
      validateRequest(commonSchema.idSchema),
    ],
    handler: contactController.deleteContactHandler,
  },
]);

export default contactRouter;
