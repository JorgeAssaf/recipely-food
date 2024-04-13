import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";
import * as schema from './schema';

const connection = createPool({
  uri: process.env.DATABASE_URL!,
});


export const db = drizzle(connection, { schema, mode: 'default' });