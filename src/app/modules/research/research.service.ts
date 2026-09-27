import ResearchModel from './research.model';
import AppError from '@/app/errors/handlers/AppError';
import { StatusCodes } from 'http-status-codes';
import { RESEARCH_MESSAGES } from './research.constant';
import { IResearch, IListResearch } from './research.schema';
import { qb } from '@/app/libs/qb';

const getAll = async (query: IListResearch) => {
  const { meta, data } = await qb(ResearchModel)
    .search(query.search, ['title', 'excerpt'])
    .sort('-publishDate')
    .paginate({ page: query.page, limit: query.limit })
    .exec();

  return { meta, research: data };
};

const getSingle = async (id: string) => {
  const researchItem = await ResearchModel.findById(id).select('-__v');
  if (!researchItem) {
    throw new AppError(RESEARCH_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  return { researchItem };
};

const createResearch = async (payload: IResearch) => {
  const researchItem = await ResearchModel.create(payload);
  return { researchItem };
};

const updateResearch = async (id: string, payload: Partial<IResearch>) => {
  const researchItem = await ResearchModel.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );
  if (!researchItem) {
    throw new AppError(RESEARCH_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  return { researchItem };
};

const deleteResearch = async (id: string) => {
  const researchItem = await ResearchModel.findByIdAndDelete(id);
  if (!researchItem) {
    throw new AppError(RESEARCH_MESSAGES.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  return { researchItem };
};

export const researchService = {
  getAll,
  getSingle,
  createResearch,
  updateResearch,
  deleteResearch,
};
