import { timestamp } from "drizzle-orm/cockroach-core";
import { text, uuid, pgTable, varchar, pgEnum} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum('user_role', ['USER', 'ADMIN']);

// creating table
export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  role: userRoleEnum().notNull().default('USER'),
  password: text().notNull(),
  salt: text().notNull() // hash(password)
});

export const userSessions = pgTable('user_sessions', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().references(() => usersTable.id).notNull(), // foreing key
  createdAt: timestamp().defaultNow().notNull()
});





