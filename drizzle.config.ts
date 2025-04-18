import * as dotenv from 'dotenv'
import { defineConfig, type Config } from 'drizzle-kit'

dotenv.config({ path: '.env.local' })

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    // using url doesn't work because it seems to override the ssl config
    url: process.env.DATABASE_URL!,
  },
}) satisfies Config
