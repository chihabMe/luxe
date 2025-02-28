import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from "dotenv";
import * as schema from "./schema";

dotenv.config();
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error("invalid database url");
export const db = drizzle(dbUrl, {
	schema,
	logger: process.env.NODE_ENV != "production",
});
