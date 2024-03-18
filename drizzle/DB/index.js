import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config()

const connectionString = process.env.DATABASE_URL;
if(!connectionString)
  throw new Error("missing DATABASE_URL environment variable");

const client = postgres(connectionString,{max:1});

export const DB = drizzle(client);


