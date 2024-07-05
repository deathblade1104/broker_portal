import { z } from 'zod';

export const configSchema = z.object({
  PG_HOST: z.string().min(1, 'PG_HOST is required'),
  PG_PORT: z.coerce.number().min(1, 'PG_PORT must be a positive number'),
  PG_USER: z.string().min(1, 'PG_USER is required'),
  PG_PASSWORD: z.string().min(1, 'PG_PASSWORD is required'),
  PG_DB: z.string().min(1, 'PG_DB is required'),
  PG_LOGGING: z.coerce.boolean().optional().default(false),
  PORT: z.coerce
    .number()
    .min(1, 'PORT must be a positive number')
    .optional()
    .default(3001),
  METABASE_SITE_URL: z.string(),
  METABASE_SECRET_KEY: z.string(),
  METABASE_EXPIRY: z.coerce.number(),
  MONGO_USERNAME: z.string().min(1, 'MONGO_USERNAME is required'),
  MONGO_PASSWORD: z.string().min(1, 'MONGO_PASSWORD is required'),
  USER_MGMT_BASE_URL: z.string().min(1, 'USER_MGMT_BASE_URL is required'),
  OKTA_DOMAIN: z.string(),
  OKTA_CLIENT_ID: z.string(),
});

export type EnvConfig = z.infer<typeof configSchema>;
