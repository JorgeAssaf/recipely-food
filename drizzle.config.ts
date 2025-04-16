import * as dotenv from 'dotenv'
import { defineConfig, type Config } from 'drizzle-kit'

dotenv.config()

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    // using url doesn't work because it seems to override the ssl config
    url: process.env.DATABASE_URL!,
    host: process.env.DATABASE_HOST!,
    port: parseInt(process.env.DATABASE_PORT!),
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    ssl: {
      ca: process.env.DATABASE_CA!,
    },
  },
}) satisfies Config
