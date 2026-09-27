import { Schema, model, Document, Types } from 'mongoose';
import { IProject } from './project.schema';

interface IProjectDoc extends Omit<IProject, 'category'> {
  category: Types.ObjectId | null;
}

const projectSchema = new Schema<IProjectDoc & Document>(
  {
    title: { type: String, required: true, trim: true },
    problemStatement: { type: String, default: '' },
    role: { type: String, default: '' },
    images: { type: [String], default: [] },
    tools: { type: [String], default: [] },
    content: { type: String, default: '' },
    category: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  },
  { timestamps: true }
);

projectSchema.index({ category: 1 });
projectSchema.index({ createdAt: -1 });

const ProjectModel = model<IProjectDoc & Document>('Project', projectSchema);
export default ProjectModel;
