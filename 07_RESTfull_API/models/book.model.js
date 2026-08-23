const { pgTable, uuid, varchar, text, index } = require("drizzle-orm/pg-core");
const {sql} = require("drizzle-orm")
const authersTable = require("./author.model");

const booksTable = pgTable(
  "books",
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    authorId: uuid()
      .references(() => authersTable.id)
      .notNull(),
  },
  (table) => ([
    index("title_index").using(
      "gin",
      sql`to_tsvector('english', ${table.title})`,
    ),
  ]),
);

module.exports = booksTable;
