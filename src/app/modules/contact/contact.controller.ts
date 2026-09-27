import catchAsync from '@/utils/catchAsync';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { contactService } from './contact.service';
import { CONTACT_MESSAGES } from './contact.constant';
import { IListContacts } from './contact.schema';

// POST /contacts — public visitor submission (no auth)
const createContactHandler = catchAsync(async (req, res) => {
  const { contact } = await contactService.createContact(req.body);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: CONTACT_MESSAGES.CREATED,
    data: { contact },
  });
});

// GET /contacts — owner inbox
const getAllContactsHandler = catchAsync(async (req, res) => {
  const query = req.query as unknown as IListContacts;
  const { meta, contacts } = await contactService.getAll(query);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: CONTACT_MESSAGES.SUCCESS,
    data: { meta, contacts },
  });
});

// GET /contacts/:id — owner
const getSingleContactHandler = catchAsync(async (req, res) => {
  const { contact } = await contactService.getSingle(req.params.id as string);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: CONTACT_MESSAGES.SUCCESS,
    data: { contact },
  });
});

// DELETE /contacts/:id — owner
const deleteContactHandler = catchAsync(async (req, res) => {
  await contactService.deleteContact(req.params.id as string);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: CONTACT_MESSAGES.DELETED,
    data: null,
  });
});

export const contactController = {
  createContactHandler,
  getAllContactsHandler,
  getSingleContactHandler,
  deleteContactHandler,
};
