import { drizzle } from 'drizzle-orm/mysql2'
import { createPool } from 'mysql2/promise'

import * as schema from './schema'

declare const globalThis: {
  _db: ReturnType<typeof drizzle>;
} & typeof global;


const connection = createPool({
  uri: process.env.DATABASE_URL!,
})

const db = globalThis._db ?? drizzle(connection, { schema, mode: 'default' })

if (process.env.NODE_ENV !== 'production') {
  globalThis._db = db
}

export { db }
