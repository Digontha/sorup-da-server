import catchAsync from '@/utils/catchAsync';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { homeService } from './home.service';
import { HOME_MESSAGES } from './home.constant';

// GET /home
const getHomeHandler = catchAsync(async (_req, res) => {
  const { home } = await homeService.getHome();

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: HOME_MESSAGES.SUCCESS,
    data: { home },
  });
});

// PUT /home
const updateHomeHandler = catchAsync(async (req, res) => {
  const { home } = await homeService.updateHome(req.body);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: HOME_MESSAGES.UPDATED,
    data: { home },
  });
});

export const homeController = {
  getHomeHandler,
  updateHomeHandler,
};
