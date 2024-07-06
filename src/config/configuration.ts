import * as dotenv from 'dotenv';
import { configSchema } from './config.zod.schema';

dotenv.config();

const parsedConfig = configSchema.safeParse(process.env);

if (!parsedConfig.success) {
  throw new Error(`Config validation error: ${parsedConfig.error.message}`);
}

export default () => ({
  postgres: {
    host: parsedConfig.data.PG_HOST,
    port: parsedConfig.data.PG_PORT,
    username: parsedConfig.data.PG_USER,
    password: parsedConfig.data.PG_PASSWORD,
    database: parsedConfig.data.PG_DB,
    logging: parsedConfig.data.PG_LOGGING,
  },

  server: {
    port: parsedConfig.data.PORT,
  },

  metabase: {
    siteUrl: parsedConfig.data.METABASE_SITE_URL,
    secretKey: parsedConfig.data.METABASE_SECRET_KEY,
    expiry: parsedConfig.data.METABASE_EXPIRY,
  },
  mongo: {
    username: parsedConfig.data.MONGO_USERNAME,
    password: parsedConfig.data.MONGO_PASSWORD,
  },
  email: {
    host: parsedConfig.data.EMAIL_HOST,
    port: parsedConfig.data.EMAIL_PORT,
    secure: parsedConfig.data.EMAIL_SECURE,
    user: parsedConfig.data.EMAIL_USER,
    password: parsedConfig.data.EMAIL_PASSWORD,
    from: parsedConfig.data.EMAIL_FROM,
  },
});
