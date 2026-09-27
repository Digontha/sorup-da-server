import { ZodError } from 'zod';

export const handleZodError = (err: ZodError) => {
  const message = 'Validation Error';
  const errorDetails = err.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));

  return {
    statusCode: 400,
    message,
    errorDetails,
  };
};
