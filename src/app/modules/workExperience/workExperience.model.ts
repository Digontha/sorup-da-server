import { Schema, model, Document } from 'mongoose';
import { IWorkExperience } from './workExperience.schema';

// Dates are validated as ISO strings by Zod, stored as Date by Mongoose
interface IWorkExperienceDoc extends Omit<IWorkExperience, 'joiningDate' | 'endingDate'> {
  joiningDate: Date;
  endingDate: Date | null;
}

const workExperienceSchema = new Schema<IWorkExperienceDoc & Document>(
  {
    institutionName: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    link: { type: String, default: '', trim: true },
    certificate: { type: String, default: '', trim: true },
    joiningDate: { type: Date, required: true },
    endingDate: { type: Date, default: null },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

workExperienceSchema.index({ joiningDate: -1 });

const WorkExperienceModel = model<IWorkExperienceDoc & Document>(
  'WorkExperience',
  workExperienceSchema
);
export default WorkExperienceModel;
