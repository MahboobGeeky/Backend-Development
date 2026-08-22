const { pgTable, uuid, varchar, text } = require("drizzle-orm/pg-core");
const authersTable = require("./author.model");

const booksTable = pgTable("books", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    authorId: uuid().references(() => authersTable.id).notNull(),
  
});

module.exports = booksTable;
