import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';

/**
 * Validates req against a Zod schema and assigns the PARSED result back
 * so Zod defaults / coercions actually reach the handlers.
 *
 * Note: in Express 5, `req.query` is a getter-only prototype property
 * (see express/lib/request.js defineGetter), so it is shadowed with an
 * own data property instead of a plain assignment.
 */
const validateRequest = (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
      params: req.params,
    }) as Record<string, unknown>;

    if (typeof parsed === 'object' && parsed !== null) {
      if ('body' in parsed) req.body = parsed.body;
      if ('params' in parsed) req.params = parsed.params as Request['params'];
      if ('query' in parsed) {
        Object.defineProperty(req, 'query', {
          value: parsed.query,
          writable: true,
          configurable: true,
          enumerable: true,
        });
      }
    }

    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default validateRequest;
