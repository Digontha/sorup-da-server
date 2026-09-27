import ProjectModel from './project.model';
import AppError from '@/app/errors/handlers/AppError';
import { StatusCodes } from 'http-status-codes';
import { PROJECT_MESSAGES } from './project.constant';
import { IProject, IListProjects } from './project.schema';
import { qb } from '@/app/libs/qb';

const getAll = async (query: IListProjects) => {
  const { meta, data } = await qb(ProjectModel)
    .search(query.search, ['title', 'role', 'tools'])
    .filter({ category: query.category })
    .sort('-createdAt')
    .populate('category')
    .paginate({ page: query.page, limit: query.limit })
    .exec();

  return { meta, projects: data };
};

const getSingle = async (id: string) => {
  const project = await ProjectModel.findById(id).select('-__v').populate('category');
  if (!project) {
    throw new AppError(PROJECT_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  return { project };
};

const createProject = async (payload: IProject) => {
  const project = await ProjectModel.create(payload);
  const populated = await project.populate('category');
  return { project: populated };
};

const updateProject = async (id: string, payload: Partial<IProject>) => {
  const project = await ProjectModel.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );
  if (!project) {
    throw new AppError(PROJECT_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  const populated = await project.populate('category');
  return { project: populated };
};

const deleteProject = async (id: string) => {
  const project = await ProjectModel.findByIdAndDelete(id);
  if (!project) {
    throw new AppError(PROJECT_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  return { project };
};

export const projectService = {
  getAll,
  getSingle,
  createProject,
  updateProject,
  deleteProject,
};
