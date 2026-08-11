const express = require("express");
const { error } = require("node:console");
const app = express();
const PORT = 8000;

// Creating Logs
// log Middleware
const fs = require("fs");

app.use((req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;

  try {
    fs.appendFileSync("logs.txt", log);
  } catch (err) {
    console.log("Error writing logs", err);
  }

  next();
});

function customMiddleware(req, res, next) {
  console.log('I am custom middleware');
  next();
}

// in memory database
const books = [
  { id: 1, title: "Book One", author: "Author One" },
  { id: 2, title: "Book Two", author: "Author Two" },
];

// Middlewares (Plugins) -> for json incoming data
app.use(express.json()); // to get json data in post

// Routes
app.get("/books", (req, res) => {
  res.setHeader("x-mah", "mahboob alam");
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id); // changed id to integer

  if (isNaN(id))
    return res.status(400).json({ error: `Is must be a type number` });

  const book = books.find((e) => e.id == id); // SELECT * from books where id = {id}
  if (!book)
    return res
      .status(404)
      .json({ error: `book with id ${id} does not exist! ` });

  return res.json(book);
});

// Add a book
app.post("/books", (req, res) => {
  // console.log(req.body);
  // console.log(req.headers);

  const { title, author } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "title is required" });

  if (!author || author === "")
    return res.status(400).json({ error: "author is required" });

  const id = books.length + 1;

  const book = { id, title, author };
  books.push(book);

  return res.status(201).json({ message: "Book created success", id });
});

// delete a book
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: `id must be a number` });
  }

  const indexToDelete = books.findIndex((e) => e.id === id);

  if (indexToDelete < 0) {
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exists!` });
  }
  books.splice(indexToDelete, 1); // delete
  return res.status(200).json({message : `book ${id} deleted successfully`})
});

app.listen(PORT, () => {
  console.log(`HTTP server is running on PORT ${PORT}`);
});
