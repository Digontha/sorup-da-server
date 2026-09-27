export const CATEGORY_MESSAGES = {
  SUCCESS: 'Category operation successful',
  FAILED: 'Category operation failed',
  NOT_FOUND: 'Category not found',
  ALREADY_EXISTS: 'Category with this name already exists',
  HAS_CONTENT: 'Cannot delete category that is assigned to projects or blogs',
  CREATED: 'Category created successfully',
  UPDATED: 'Category updated successfully',
  DELETED: 'Category deleted successfully',
};

export const CATEGORY_APPLIES_TO = {
  PROJECT: 'project',
  BLOG: 'blog',
} as const;
