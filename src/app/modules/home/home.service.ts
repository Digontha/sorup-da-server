import HomeModel from './home.model';
import { IHome } from './home.schema';

// Singleton: there is exactly one document (upserted on first access)
const getHome = async () => {
  const home = await HomeModel.findOneAndUpdate(
    {},
    {},
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  return { home };
};

const updateHome = async (payload: Partial<IHome>) => {
  const home = await HomeModel.findOneAndUpdate(
    {},
    { $set: payload },
    { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: true }
  );
  return { home };
};

export const homeService = {
  getHome,
  updateHome,
};
