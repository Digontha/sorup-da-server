import WorkExperienceModel from './workExperience.model';
import AppError from '@/app/errors/handlers/AppError';
import { StatusCodes } from 'http-status-codes';
import { WORK_EXPERIENCE_MESSAGES } from './workExperience.constant';
import { IWorkExperience, IListWorkExperience } from './workExperience.schema';
import { qb } from '@/app/libs/qb';

const getAll = async (query: IListWorkExperience) => {
  const { meta, data } = await qb(WorkExperienceModel)
    .search(query.search, ['institutionName', 'role', 'description'])
    .sort('-joiningDate')
    .paginate({ page: query.page, limit: query.limit })
    .exec();

  return { meta, workExperiences: data };
};

const getSingle = async (id: string) => {
  const workExperience = await WorkExperienceModel.findById(id).select('-__v');
  if (!workExperience) {
    throw new AppError(WORK_EXPERIENCE_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  return { workExperience };
};

const createWorkExperience = async (payload: IWorkExperience) => {
  const workExperience = await WorkExperienceModel.create(payload);
  return { workExperience };
};

const updateWorkExperience = async (id: string, payload: Partial<IWorkExperience>) => {
  const workExperience = await WorkExperienceModel.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );
  if (!workExperience) {
    throw new AppError(WORK_EXPERIENCE_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  return { workExperience };
};

const deleteWorkExperience = async (id: string) => {
  const workExperience = await WorkExperienceModel.findByIdAndDelete(id);
  if (!workExperience) {
    throw new AppError(WORK_EXPERIENCE_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  return { workExperience };
};

export const workExperienceService = {
  getAll,
  getSingle,
  createWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
};
