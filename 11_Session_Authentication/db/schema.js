import { uuid, pgTable, varchar } from "drizzle-orm/pg-core";

// creating table
export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  salt: text().notNull() // hash(password)
});



