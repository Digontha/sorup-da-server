import { Schema, model, Document } from 'mongoose';
import { IHome } from './home.schema';

const homeSchema = new Schema<IHome & Document>(
  {
    cvUrl: { type: String, default: '' },
    tagline: { type: String, default: '' },
    shareYourIdeaText: { type: String, default: '' },
    shareYourIdeaCtaLabel: { type: String, default: '' },
    shareYourIdeaCtaLink: { type: String, default: '' },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

const HomeModel = model<IHome & Document>('Home', homeSchema);
export default HomeModel;
