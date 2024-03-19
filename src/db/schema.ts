import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";



export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  createAt: timestamp("createdAt").defaultNow(),
  userId: text("userId").notNull(),
  updatedAt: timestamp("createdAt").defaultNow(),
});