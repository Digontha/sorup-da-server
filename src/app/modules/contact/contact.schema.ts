import { z } from 'zod';
import { commonSchema } from '@/app/schema/common.schema';

// Public visitor submission — POST /contacts (no auth)
const createContact = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Name is required').max(200),
    email: z.string().trim().email('Invalid email address').max(320),
    message: z.string().trim().min(1, 'Message is required').max(10000),
  }),
});

// Owner inbox listing — GET /contacts
const listContacts = z.object({
  query: commonSchema.paginationQuery,
});

export const contactSchema = {
  createContact,
  listContacts,
};

export type IContact = z.infer<typeof createContact>['body'];
export type IListContacts = z.infer<typeof listContacts>['query'];
