import { Schema, model, Document, Types } from 'mongoose';
import { IBlog } from './blog.schema';

interface IBlogDoc extends Omit<IBlog, 'category'> {
  slug: string;
  category: Types.ObjectId | null;
}

const blogSchema = new Schema<IBlogDoc & Document>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    images: { type: [String], default: [] },
    author: { type: String, default: '', trim: true },
    excerpt: { type: String, default: '' },
    category: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    blogLink: { type: String, default: '', trim: true },
    articleContent: { type: String, default: '' },
  },
  { timestamps: true }
);

blogSchema.index({ category: 1 });
blogSchema.index({ createdAt: -1 });

const BlogModel = model<IBlogDoc & Document>('Blog', blogSchema);
export default BlogModel;
