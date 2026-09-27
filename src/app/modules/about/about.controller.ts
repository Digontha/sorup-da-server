import catchAsync from '@/utils/catchAsync';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { aboutService } from './about.service';
import { ABOUT_MESSAGES } from './about.constant';

// GET /about — public (contact page + footer pull socialLinks from here)
const getAboutHandler = catchAsync(async (_req, res) => {
  const { about } = await aboutService.getAbout();

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: ABOUT_MESSAGES.SUCCESS,
    data: { about },
  });
});

// PUT /about — owner only
const updateAboutHandler = catchAsync(async (req, res) => {
  const { about } = await aboutService.updateAbout(req.body);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: ABOUT_MESSAGES.UPDATED,
    data: { about },
  });
});

export const aboutController = {
  getAboutHandler,
  updateAboutHandler,
};
