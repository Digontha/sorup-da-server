import CategoryModel from './category.model';
import ProjectModel from '../project/project.model';
import BlogModel from '../blog/blog.model';
import AppError from '@/app/errors/handlers/AppError';
import { StatusCodes } from 'http-status-codes';
import { CATEGORY_MESSAGES } from './category.constant';
import { ICategory, IListCategories } from './category.schema';
import { qb } from '@/app/libs/qb';

const getAll = async (query: IListCategories) => {
  const { meta, data } = await qb(CategoryModel)
    .search(query.search, ['name'])
    .filter({ appliesTo: query.appliesTo })
    .sort('name')
    .paginate({ page: query.page, limit: query.limit })
    .exec();

  return { meta, categories: data };
};

const getSingle = async (id: string) => {
  const category = await CategoryModel.findById(id).select('-__v');
  if (!category) {
    throw new AppError(CATEGORY_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  return { category };
};

const assertNameAvailable = async (name: string, appliesTo: string, excludeId?: string) => {
  const filter: Record<string, unknown> = { name, appliesTo };
  if (excludeId) filter._id = { $ne: excludeId };
  const duplicate = await CategoryModel.exists(filter);
  if (duplicate) {
    throw new AppError(CATEGORY_MESSAGES.ALREADY_EXISTS, StatusCodes.CONFLICT);
  }
};

const createCategory = async (payload: ICategory) => {
  await assertNameAvailable(payload.name, payload.appliesTo);
  const category = await CategoryModel.create(payload);
  return { category };
};

const updateCategory = async (id: string, payload: Partial<ICategory>) => {
  const existing = await CategoryModel.findById(id);
  if (!existing) {
    throw new AppError(CATEGORY_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  const name = payload.name ?? existing.name;
  const appliesTo = payload.appliesTo ?? existing.appliesTo;
  await assertNameAvailable(name, appliesTo, id);

  const category = await CategoryModel.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );
  if (!category) {
    throw new AppError(CATEGORY_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  return { category };
};

const deleteCategory = async (id: string) => {
  const category = await CategoryModel.findById(id);
  if (!category) {
    throw new AppError(CATEGORY_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  const [projectCount, blogCount] = await Promise.all([
    ProjectModel.countDocuments({ category: id }),
    BlogModel.countDocuments({ category: id }),
  ]);

  if (projectCount > 0 || blogCount > 0) {
    throw new AppError(CATEGORY_MESSAGES.HAS_CONTENT, StatusCodes.CONFLICT);
  }

  await CategoryModel.findByIdAndDelete(id);
  return { category };
};

export const categoryService = {
  getAll,
  getSingle,
  createCategory,
  updateCategory,
  deleteCategory,
};
