import { Schema, model, Document } from 'mongoose';
import { IResearch } from './research.schema';

// publishDate is validated as an ISO string by Zod, stored as Date by Mongoose
interface IResearchDoc extends Omit<IResearch, 'publishDate'> {
  publishDate: Date;
}

const researchSchema = new Schema<IResearchDoc & Document>(
  {
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, default: '' },
    citation: { type: String, default: '' },
    publishDate: { type: Date, required: true },
  },
  { timestamps: true }
);

researchSchema.index({ publishDate: -1 });

const ResearchModel = model<IResearchDoc & Document>('Research', researchSchema);
export default ResearchModel;
