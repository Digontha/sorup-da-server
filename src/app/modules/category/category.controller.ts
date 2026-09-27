import catchAsync from '@/utils/catchAsync';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { categoryService } from './category.service';
import { CATEGORY_MESSAGES } from './category.constant';
import { IListCategories } from './category.schema';

// GET /categories
const getAllCategoriesHandler = catchAsync(async (req, res) => {
  const query = req.query as unknown as IListCategories;
  const { meta, categories } = await categoryService.getAll(query);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: CATEGORY_MESSAGES.SUCCESS,
    data: { meta, categories },
  });
});

// GET /categories/:id
const getSingleCategoryHandler = catchAsync(async (req, res) => {
  const { category } = await categoryService.getSingle(req.params.id as string);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: CATEGORY_MESSAGES.SUCCESS,
    data: { category },
  });
});

// POST /categories
const createCategoryHandler = catchAsync(async (req, res) => {
  const { category } = await categoryService.createCategory(req.body);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: CATEGORY_MESSAGES.CREATED,
    data: { category },
  });
});

// PUT /categories/:id
const updateCategoryHandler = catchAsync(async (req, res) => {
  const { category } = await categoryService.updateCategory(req.params.id as string, req.body);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: CATEGORY_MESSAGES.UPDATED,
    data: { category },
  });
});

// DELETE /categories/:id
const deleteCategoryHandler = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.params.id as string);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: CATEGORY_MESSAGES.DELETED,
    data: null,
  });
});

export const categoryController = {
  getAllCategoriesHandler,
  getSingleCategoryHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
};
