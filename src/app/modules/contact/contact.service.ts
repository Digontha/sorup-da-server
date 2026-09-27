import ContactSubmissionModel from './contact.model';
import AppError from '@/app/errors/handlers/AppError';
import { StatusCodes } from 'http-status-codes';
import { CONTACT_MESSAGES } from './contact.constant';
import { IContact, IListContacts } from './contact.schema';
import { qb } from '@/app/libs/qb';
import { emailService } from '@/services/email/emailSender';

// Public: save first, then best-effort email notification (SMTP failure never
// fails the visitor's submission — logged instead).
const createContact = async (payload: IContact) => {
  const contact = await ContactSubmissionModel.create(payload);

  try {
    await emailService.sendContactNotification(payload);
  } catch (error) {
    console.error('[contact] Failed to send notification email:', error);
  }

  return { contact };
};

// Owner inbox
const getAll = async (query: IListContacts) => {
  const { meta, data } = await qb(ContactSubmissionModel)
    .search(query.search, ['name', 'email', 'message'])
    .sort('-createdAt')
    .paginate({ page: query.page, limit: query.limit })
    .exec();

  return { meta, contacts: data };
};

const getSingle = async (id: string) => {
  const contact = await ContactSubmissionModel.findById(id).select('-__v');
  if (!contact) {
    throw new AppError(CONTACT_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  return { contact };
};

const deleteContact = async (id: string) => {
  const contact = await ContactSubmissionModel.findByIdAndDelete(id);
  if (!contact) {
    throw new AppError(CONTACT_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  return { contact };
};

export const contactService = {
  createContact,
  getAll,
  getSingle,
  deleteContact,
};
