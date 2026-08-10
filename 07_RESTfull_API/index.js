const express = require("express");
const { error } = require("node:console");

const app = express();
const PORT = 8000;

// in memory database
const books = [
  { id: 1, title: "Book One", author: "Author One" },
  { id: 2, title: "Book Two", author: "Author Two" },
];

// Routes
app.get("/books", (req, res) => {
  res.setHeader("x-mah", "mahboob alam");
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id); // changed id to integer
  
  if(isNaN(id))
    return res.status(400).json({error: `Is must be a type number`});

  const book = books.find((e) => e.id == id); // SELECT * from books where id = {id}
  if (!book)
    return res
      .status(404)
      .json({ error: `book with id ${id} does not exist! ` });
    
      return res.json(book);
});

app.listen(PORT, () => {
  console.log(`HTTP server is running on PORT ${PORT}`);
});
