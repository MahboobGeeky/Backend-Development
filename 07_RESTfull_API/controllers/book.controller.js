const booksTable = require("../models/book.model");
const db = require("../db");
const { eq } = require("drizzle-orm");

exports.getAllBooks = async function (req, res) {
  const books = await db.select().from(booksTable);
  res.status(200).json(books);
};

// // Routes
// router.get("/", (req, res) => {
//   res.json(BOOKS);
// });

// get a book by id

exports.getBookById = async function (req, res) {
  const id = req.params.id;

  const [book] = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, id))
    .limit(1);
  if (!book)
    return res
      .status(404)
      .json({ error: `book with id ${id} does not exist` });

  return res.json(book);
};

// ADD A BOOK
exports.createBook = async function (req, res) {

  const { title, description, authorId } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "title is required" });

  const [result] = db.insert(booksTable).values({
    title,
    authorId,
    description,
  }).returning({
    id: booksTable.id,
  });

  return res.status(201).json({ message: "Book created success", id: result.id });
};

// delete a book
exports.delete = async function (req, res){
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({error: `id must be a number` });
  }

  const result = await db.delete(booksTable).where((booksTable) => {eq(booksTable.id, id)}).returning();

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

