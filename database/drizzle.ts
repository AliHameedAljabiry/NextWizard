// /database/drizzle.ts

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema'; // Make sure this exports `categories`, `parts`, `steps`, etc.

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
