import fs from 'fs';
import dotenv from 'dotenv';
import { z } from 'zod';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');

if (fs.existsSync(envPath)) {
  dotenv.config();
}

const examplePath = path.resolve(process.cwd(), '.env.example');
const exampleKeys = fs.existsSync(examplePath)
  ? fs
      .readFileSync(examplePath, 'utf8')
      .split('\n')
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => line.split('=')[0].trim())
  : [];

if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  const envLines = envFile
    .split('\n')
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.split('=')[0].trim());

  const missingKeys = exampleKeys.filter((key) => !envLines.includes(key));
  if (missingKeys.length > 0) {
    console.error(
      `⚠️  Missing environment variables from .env:\n   ${missingKeys.join(
        ', '
      )}\nPlease update your .env file to match .env.example`
    );
    process.exit(1);
  }

  const extraKeys = envLines.filter((key) => !exampleKeys.includes(key));
  if (extraKeys.length > 0) {
    console.warn(
      `⚠️  Extra variables found in .env (not in .env.example):\n   ${extraKeys.join(
        ', '
      )}\nThese will be ignored.`
    );
  }
}

const envSchema = z.object({
  PORT: z.string().regex(/^\d+$/, 'PORT must be a number'),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  CLIENT_URI: z.string().url('CLIENT_URI must be a valid URL'),
  SERVER_URI: z.string().url('SERVER_URI must be a valid URL'),
  CORS_ORIGINS: z.string().min(1, 'CORS_ORIGINS is required'),
  CLERK_PUBLISHABLE_KEY: z.string().min(1, 'CLERK_PUBLISHABLE_KEY is required'),
  CLERK_SECRET_KEY: z.string().min(1, 'CLERK_SECRET_KEY is required'),
  ADMIN_CLERK_ID: z.string().min(1, 'ADMIN_CLERK_ID is required'),
  SMTP_HOST: z.string().min(1, 'SMTP_HOST is required'),
  SMTP_PORT: z.string().regex(/^\d+$/, 'SMTP_PORT must be a number'),
  SMTP_USER: z.string().min(1, 'SMTP_USER is required'),
  SMTP_PASS: z.string().min(1, 'SMTP_PASS is required'),
  CONTACT_NOTIFY_EMAIL: z.string().email('CONTACT_NOTIFY_EMAIL must be a valid email'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('\n⚠️  Invalid environment variable values:\n');
  Object.entries(parsed.error.format()).forEach(([key, value]) => {
    if (value && '_errors' in value && value._errors.length > 0) {
      console.error(`   ${key}: ${value._errors.join(', ')}`);
    }
  });
  console.error('\nPlease fix the above environment variables.');
  process.exit(1);
}

let config: {
  PORT: number;
  MONGO_URI: string;
  CLIENT_URI: string;
  SERVER_URI: string;
  CORS_ORIGINS: string;
  CLERK_PUBLISHABLE_KEY: string;
  CLERK_SECRET_KEY: string;
  ADMIN_CLERK_ID: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
  CONTACT_NOTIFY_EMAIL: string;
};

const {
  PORT,
  MONGO_URI,
  CLIENT_URI,
  SERVER_URI,
  CORS_ORIGINS,
  CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY,
  ADMIN_CLERK_ID,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  CONTACT_NOTIFY_EMAIL,
} = parsed.data;

config = {
  PORT: parseInt(PORT, 10),
  MONGO_URI,
  CLIENT_URI,
  SERVER_URI,
  CORS_ORIGINS,
  CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY,
  ADMIN_CLERK_ID,
  SMTP_HOST,
  SMTP_PORT: parseInt(SMTP_PORT, 10),
  SMTP_USER,
  SMTP_PASS,
  CONTACT_NOTIFY_EMAIL,
};

export { config };
