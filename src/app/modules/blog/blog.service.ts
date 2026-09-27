import BlogModel from './blog.model';
import AppError from '@/app/errors/handlers/AppError';
import { StatusCodes } from 'http-status-codes';
import { BLOG_MESSAGES } from './blog.constant';
import { IBlog, IListBlogs } from './blog.schema';
import { qb } from '@/app/libs/qb';
import { generateUniqueSlug } from '@/utils/generateSlug';

const slugExists = async (slug: string, excludeId?: string) => {
  const filter: Record<string, unknown> = { slug };
  if (excludeId) filter._id = { $ne: excludeId };
  return !!(await BlogModel.exists(filter));
};

const getAll = async (query: IListBlogs) => {
  const { meta, data } = await qb(BlogModel)
    .search(query.search, ['title', 'author', 'excerpt'])
    .filter({ category: query.category })
    .sort('-createdAt')
    .populate('category')
    .paginate({ page: query.page, limit: query.limit })
    .exec();

  return { meta, blogs: data };
};

const getSingle = async (id: string) => {
  const blog = await BlogModel.findById(id).select('-__v').populate('category');
  if (!blog) {
    throw new AppError(BLOG_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  return { blog };
};

const getBySlug = async (slug: string) => {
  const blog = await BlogModel.findOne({ slug }).select('-__v').populate('category');
  if (!blog) {
    throw new AppError(BLOG_MESSAGES.SLUG_NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  return { blog };
};

const createBlog = async (payload: IBlog) => {
  const slug = await generateUniqueSlug(payload.title, (candidate) => slugExists(candidate));
  const blog = await BlogModel.create({ ...payload, slug });
  const populated = await blog.populate('category');
  return { blog: populated };
};

const updateBlog = async (id: string, payload: Partial<IBlog>) => {
  const existing = await BlogModel.findById(id);
  if (!existing) {
    throw new AppError(BLOG_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  // Keep the slug in sync with the title (only when the title changed)
  let slug = existing.slug;
  if (payload.title && payload.title !== existing.title) {
    slug = await generateUniqueSlug(payload.title, (candidate) => slugExists(candidate, id));
  }

  const blog = await BlogModel.findByIdAndUpdate(
    id,
    { $set: { ...payload, slug } },
    { new: true, runValidators: true }
  );
  if (!blog) {
    throw new AppError(BLOG_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  const populated = await blog.populate('category');
  return { blog: populated };
};

const deleteBlog = async (id: string) => {
  const blog = await BlogModel.findByIdAndDelete(id);
  if (!blog) {
    throw new AppError(BLOG_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  return { blog };
};

export const blogService = {
  getAll,
  getSingle,
  getBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
};
