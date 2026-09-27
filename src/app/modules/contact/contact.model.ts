import { Schema, model, Document } from 'mongoose';
import { IContact } from './contact.schema';

const contactSubmissionSchema = new Schema<IContact & Document>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

contactSubmissionSchema.index({ createdAt: -1 });

const ContactSubmissionModel = model<IContact & Document>(
  'ContactSubmission',
  contactSubmissionSchema
);
export default ContactSubmissionModel;
