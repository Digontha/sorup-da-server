import { Schema, model, Document } from 'mongoose';
import { IAbout } from './about.schema';

const socialLinkSchema = new Schema(
  {
    platform: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const educationSchema = new Schema(
  {
    universityName: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const certificationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    link: { type: String, default: '', trim: true },
  },
  { _id: false }
);

const aboutSchema = new Schema<IAbout & Document>(
  {
    profileImage: { type: String, default: '' },
    aboutContent: { type: String, default: '' },
    socialLinks: { type: [socialLinkSchema], default: [] },
    education: { type: [educationSchema], default: [] },
    certifications: { type: [certificationSchema], default: [] },
  },
  { timestamps: true }
);

const AboutModel = model<IAbout & Document>('About', aboutSchema);
export default AboutModel;
