import catchAsync from '@/utils/catchAsync';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { workExperienceService } from './workExperience.service';
import { WORK_EXPERIENCE_MESSAGES } from './workExperience.constant';
import { IListWorkExperience } from './workExperience.schema';

// GET /work-experiences
const getAllWorkExperiencesHandler = catchAsync(async (req, res) => {
  const query = req.query as unknown as IListWorkExperience;
  const { meta, workExperiences } = await workExperienceService.getAll(query);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: WORK_EXPERIENCE_MESSAGES.SUCCESS,
    data: { meta, workExperiences },
  });
});

// GET /work-experiences/:id
const getSingleWorkExperienceHandler = catchAsync(async (req, res) => {
  const { workExperience } = await workExperienceService.getSingle(req.params.id as string);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: WORK_EXPERIENCE_MESSAGES.SUCCESS,
    data: { workExperience },
  });
});

// POST /work-experiences
const createWorkExperienceHandler = catchAsync(async (req, res) => {
  const { workExperience } = await workExperienceService.createWorkExperience(req.body);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: WORK_EXPERIENCE_MESSAGES.CREATED,
    data: { workExperience },
  });
});

// PUT /work-experiences/:id
const updateWorkExperienceHandler = catchAsync(async (req, res) => {
  const { workExperience } = await workExperienceService.updateWorkExperience(
    req.params.id as string,
    req.body
  );

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: WORK_EXPERIENCE_MESSAGES.UPDATED,
    data: { workExperience },
  });
});

// DELETE /work-experiences/:id
const deleteWorkExperienceHandler = catchAsync(async (req, res) => {
  await workExperienceService.deleteWorkExperience(req.params.id as string);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: WORK_EXPERIENCE_MESSAGES.DELETED,
    data: null,
  });
});

export const workExperienceController = {
  getAllWorkExperiencesHandler,
  getSingleWorkExperienceHandler,
  createWorkExperienceHandler,
  updateWorkExperienceHandler,
  deleteWorkExperienceHandler,
};
