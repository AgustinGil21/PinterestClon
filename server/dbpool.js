import 'dotenv/config';
import { DATABASE_URL } from './config';
import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  allowExitOnIdle: true,
});
