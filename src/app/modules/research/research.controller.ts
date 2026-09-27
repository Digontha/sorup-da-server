import catchAsync from '@/utils/catchAsync';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { researchService } from './research.service';
import { RESEARCH_MESSAGES } from './research.constant';
import { IListResearch } from './research.schema';

// GET /research
const getAllResearchHandler = catchAsync(async (req, res) => {
  const query = req.query as unknown as IListResearch;
  const { meta, research } = await researchService.getAll(query);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: RESEARCH_MESSAGES.SUCCESS,
    data: { meta, research },
  });
});

// GET /research/:id
const getSingleResearchHandler = catchAsync(async (req, res) => {
  const { researchItem } = await researchService.getSingle(req.params.id as string);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: RESEARCH_MESSAGES.SUCCESS,
    data: { research: researchItem },
  });
});

// POST /research
const createResearchHandler = catchAsync(async (req, res) => {
  const { researchItem } = await researchService.createResearch(req.body);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: RESEARCH_MESSAGES.CREATED,
    data: { research: researchItem },
  });
});

// PUT /research/:id
const updateResearchHandler = catchAsync(async (req, res) => {
  const { researchItem } = await researchService.updateResearch(req.params.id as string, req.body);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: RESEARCH_MESSAGES.UPDATED,
    data: { research: researchItem },
  });
});

// DELETE /research/:id
const deleteResearchHandler = catchAsync(async (req, res) => {
  await researchService.deleteResearch(req.params.id as string);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: RESEARCH_MESSAGES.DELETED,
    data: null,
  });
});

export const researchController = {
  getAllResearchHandler,
  getSingleResearchHandler,
  createResearchHandler,
  updateResearchHandler,
  deleteResearchHandler,
};
