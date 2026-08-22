const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  createBook,
  delete: deleteBook,
} = require("../controllers/book.controller");

// GET all books
router.get("/", getAllBooks);

// GET a single book by ID
router.get("/:id", getBookById);

// CREATE a book
router.post("/", createBook);

// DELETE a book
router.delete("/:id", deleteBook);

module.exports = router;