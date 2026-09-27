import AboutModel from './about.model';
import { IAbout } from './about.schema';

// Singleton: there is exactly one document (upserted on first access)
const getAbout = async () => {
  const about = await AboutModel.findOneAndUpdate(
    {},
    {},
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  return { about };
};

const updateAbout = async (payload: Partial<IAbout>) => {
  const about = await AboutModel.findOneAndUpdate(
    {},
    { $set: payload },
    { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: true }
  );
  return { about };
};

export const aboutService = {
  getAbout,
  updateAbout,
};
