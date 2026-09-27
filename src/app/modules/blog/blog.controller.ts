import catchAsync from '@/utils/catchAsync';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { blogService } from './blog.service';
import { BLOG_MESSAGES } from './blog.constant';
import { IListBlogs } from './blog.schema';

// GET /blogs
const getAllBlogsHandler = catchAsync(async (req, res) => {
  const query = req.query as unknown as IListBlogs;
  const { meta, blogs } = await blogService.getAll(query);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: BLOG_MESSAGES.SUCCESS,
    data: { meta, blogs },
  });
});

// GET /blogs/slug/:slug
const getBlogBySlugHandler = catchAsync(async (req, res) => {
  const { blog } = await blogService.getBySlug(req.params.slug as string);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: BLOG_MESSAGES.SUCCESS,
    data: { blog },
  });
});

// GET /blogs/:id
const getSingleBlogHandler = catchAsync(async (req, res) => {
  const { blog } = await blogService.getSingle(req.params.id as string);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: BLOG_MESSAGES.SUCCESS,
    data: { blog },
  });
});

// POST /blogs
const createBlogHandler = catchAsync(async (req, res) => {
  const { blog } = await blogService.createBlog(req.body);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: BLOG_MESSAGES.CREATED,
    data: { blog },
  });
});

// PUT /blogs/:id
const updateBlogHandler = catchAsync(async (req, res) => {
  const { blog } = await blogService.updateBlog(req.params.id as string, req.body);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: BLOG_MESSAGES.UPDATED,
    data: { blog },
  });
});

// DELETE /blogs/:id
const deleteBlogHandler = catchAsync(async (req, res) => {
  await blogService.deleteBlog(req.params.id as string);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: BLOG_MESSAGES.DELETED,
    data: null,
  });
});

export const blogController = {
  getAllBlogsHandler,
  getBlogBySlugHandler,
  getSingleBlogHandler,
  createBlogHandler,
  updateBlogHandler,
  deleteBlogHandler,
};
