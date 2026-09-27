import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { clerkMiddleware } from '@clerk/express';
import { StatusCodes } from 'http-status-codes';
import router from './app/routes';
import errorHandler from './app/middlewares/errorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';
import { sendSuccessResponse } from './utils/response';
import { config } from './config/env';

const app = express();
const corsOrigins = config.CORS_ORIGINS.split(',').map((origin) => origin.trim());

const clerkOptions = {
  publishableKey: config.CLERK_PUBLISHABLE_KEY,
  secretKey: config.CLERK_SECRET_KEY,
};

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(clerkMiddleware(clerkOptions));

// Static route — MUST be declared before the dynamic /api/v1 router
app.get('/api/v1/health', (_req, res) => {
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Server is running and healthy',
    data: {
      name: 'API',
      version: '1.0.0',
    },
  });
});

app.use('/api/v1', router);

// Catch-all for 404
app.use(notFoundHandler);

// Global error handler — always last
app.use(errorHandler);

export default app;
