const express = require('express')
const {BOOKS} = require('../models/book')
const router = express.Router()
const controller = require('../controllers/book.controller')
// Routes

router.get("/", controller.getAllBokks);

// get a book by id
router.get("/:id", controller.getBookById);

// Add a book
router.post("/", controller.createBook);


// delete a book
router.delete("/:id", controller.deleteBookById);



module.exports = router;