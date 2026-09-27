import { Request, Response, NextFunction } from 'express';
import { getAuth } from '@clerk/express';
import { StatusCodes } from 'http-status-codes';
import AppError from '@/app/errors/handlers/AppError';
import { config } from '@/config/env';

/** Requires a valid Clerk session; stores the Clerk userId on req.userId. */
const requireAuth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return next(
        new AppError('Unauthorized - Please log in to continue.', StatusCodes.UNAUTHORIZED)
      );
    }
    req.userId = userId;
    next();
  } catch (error) {
    console.error('[requireAuth] Error:', error);
    return next(new AppError('Authentication failed - Invalid session.', StatusCodes.UNAUTHORIZED));
  }
};

/**
 * Single-owner gate: the authenticated Clerk userId must equal ADMIN_CLERK_ID.
 * Self-contained (does not depend on requireAuth having run first).
 */
const requireAdmin = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return next(
        new AppError('Unauthorized - Please log in to continue.', StatusCodes.UNAUTHORIZED)
      );
    }
    if (userId !== config.ADMIN_CLERK_ID) {
      return next(new AppError('Access denied. Admin access required.', StatusCodes.FORBIDDEN));
    }
    req.userId = userId;
    next();
  } catch (error) {
    console.error('[requireAdmin] Error:', error);
    return next(new AppError('Authentication failed - Invalid session.', StatusCodes.UNAUTHORIZED));
  }
};

export const authMiddleware = {
  requireAuth,
  requireAdmin,
};
