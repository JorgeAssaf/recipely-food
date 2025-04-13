
import * as schema from './schema'

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    ca: process.env.DATABASE_CA,
  }
});
const db = drizzle({ client: pool, schema });
export { db }
