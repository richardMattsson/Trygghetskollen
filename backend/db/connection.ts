import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

export const client = new Pool({
  connectionString: process.env.PGURI,
});
