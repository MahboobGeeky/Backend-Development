const express = require("express");
const router = express.Router();

const {
    getAllAuthors, 
    getAuthorById, 
    createAuthor, 
    deleteAuthorById,
    getBooksByAuthorId
} = require('../controllers/author.controller');

// GET ALL AUTHORS
router.get('/', getAllAuthors);

// GET AUTHOR BY ID
router.get('/:id', getAuthorById);

// CREATE AUTHOR
router.post('/', createAuthor);

// DELETE AUTHOR BY ID
router.delete('/:id', deleteAuthorById);

// GET BOOKS BY AUTHOR ID
router.get('/:id/books', getBooksByAuthorId);

module.exports = router;
