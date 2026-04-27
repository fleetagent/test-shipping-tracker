import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/shipping";
const sql = postgres(connectionString);
export const db = drizzle(sql);
