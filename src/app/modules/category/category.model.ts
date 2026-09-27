import { Schema, model, Document } from 'mongoose';
import { ICategory } from './category.schema';
import { CATEGORY_APPLIES_TO } from './category.constant';

const categorySchema = new Schema<ICategory & Document>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    appliesTo: {
      type: String,
      required: true,
      enum: Object.values(CATEGORY_APPLIES_TO),
    },
  },
  { timestamps: true }
);

// One category name per target collection
categorySchema.index({ name: 1, appliesTo: 1 }, { unique: true });

const CategoryModel = model<ICategory & Document>('Category', categorySchema);
export default CategoryModel;
