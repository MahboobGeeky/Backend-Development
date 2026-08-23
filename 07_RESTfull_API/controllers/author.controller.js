const authorsTable = require("../models/author.model");
const db = require("../db");
const {eq} = require('drizzle-orm');
const booksTable = require("../models/book.model");


// GET ALL AUTHORS
exports.getAllAuthors = async function (req, res) {
  const authors = await db.select().from(authorsTable);

  if (authors.length == 0) {
    return res
      .status(404)
      .json({ message: `There are not any Authors in database` });
  }

  return res.status(200).json(authors);
};


// GET AUTHORS BY ID
exports.getAuthorById = async function(req, res) {
    const id = req.params.id;
    const result = await db
        .select()
        .from(authorsTable)
        .where(eq(authorsTable.id, id));
    if(result.length==0){
        return res
            .status(404)
            .json({message: `author does not exist with this id ${id}`});
    }

    return res.status(200).json(result);
}

// CREATE AUTHOR
exports.createAuthor = async function (req, res) {
    const {firstName, lastName, email} = req.body;

    if(firstName=='' || lastName=='' || email==''){
        return res.status(404).json({message: `Invalid details`});
    }
    
    const [author] = await db
        .insert(authorsTable)
        .values({
            firstName,
            lastName,
            email
    }).returning({
        id: authorsTable.id
    });

    return res.status(201).json({message: `Author created successfully`, id: author.id});

};


// DELETE AUTHOR
exports.deleteAuthorById = async function (req, res) {
    const id = req.params.id;
    const result = await db.delete(authorsTable).where(eq(authorsTable.id, id));
    if(result.length==0){
        return res
        .status(404)
        .json({message: `author can't be delete, bcz author with id ${id} does not exist`});
    }

    return res.status(200).json({message: `author deleted successfully`, id: `${id}`});

};

// GET ALL BOOKS BY AUTHOR ID
exports.getBooksByAuthorId = async function(req, res) {
    const id = req.params.id;
    const books = await db
        .select()
        .from(booksTable)
        .where(eq(booksTable.authorId, id));
        
    return res.status(200).json(books);
};

