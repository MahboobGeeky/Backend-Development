const booksTable = require("../models/book.model");
const authorsTable = require("../models/author.model")
const {sql} = require("drizzle-orm");
const db = require("../db");
const { eq } = require("drizzle-orm");

exports.getAllBooks = async function (req, res) {
  const search = req.query.search;

  if (search) {
    const books = await db
      .select()
      .from(booksTable)
      .where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`); // search via indexing
      return res.json(books);
  }

  const books = await db.select().from(booksTable);
  res.status(200).json(books);
};

// GET BOOK BY ID
exports.getBookById = async function (req, res) {
  const id = req.params.id;

  const [book] = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, id))
    .leftJoin(authorsTable, eq(booksTable.authorId, authorsTable.id)) //get author also
    .limit(1);
  if (!book)
    return res.status(404).json({ error: `book with id ${id} does not exist` });

  return res.json(book);
};

// ADD A BOOK
exports.createBook = async function (req, res) {
  const { title, description, authorId } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "title is required" });

  const [result] = await db
    .insert(booksTable)
    .values({
      title,
      authorId,
      description,
    })
    .returning({
      id: booksTable.id,
    });

  return res
    .status(201)
    .json({ message: "Book created success", id: result.id });
};

// delete a book
exports.delete = async function (req, res) {
  const id = req.params.id;

  const result = await db
    .delete(booksTable)
    .where(eq(booksTable.id, id))
    .returning();

  if (result.length == 0) {
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exists!` });
  }

  return res.status(200).json({
    message: `book deleted`,
    book: result[0],
  });
};
