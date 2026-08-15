const { BOOKS } = require("../models/book");

exports.getAllBokks = function (req, res) {
  res.json(BOOKS);
};

exports.getBookById = function (req, res) {
  const id = parseInt(req.params.id); // changed id to integer

  if (isNaN(id))
    return res.status(400).json({ error: `Is must be a type number` });

  const book = BOOKS.find((e) => e.id == id); // SELECT * from BOOKS where id = {id}
  if (!book)
    return res
      .status(404)
      .json({ error: `book with id ${id} does not exist! ` });

  return res.json(book);
};

exports.createBook = function (req, res) {
  // console.log(req.body);
  // console.log(req.headers);

  const { title, author } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "title is required" });

  if (!author || author === "")
    return res.status(400).json({ error: "author is required" });

  const id = BOOKS.length + 1;

  const book = { id, title, author };
  BOOKS.push(book);

  return res.status(201).json({ message: "Book created success", id });
};

exports.deleteBookById = function (req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: `id must be a number` });
  }

  const indexToDelete = BOOKS.findIndex((e) => e.id === id);

  if (indexToDelete < 0) {
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exists!` });
  }
  BOOKS.splice(indexToDelete, 1); // delete
  return res.status(200).json({ message: `book ${id} deleted successfully` });
};
