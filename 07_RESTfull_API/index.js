const express = require("express");
const { error } = require("node:console");
const {loggerMiddleware} = require('./middlewares/logger')
const app = express();
const PORT = 8000;

const bookRouter = require('./routes/book.routes');


function customMiddleware(req, res, next) {
  console.log('I am custom middleware');
  next();
}



// Middlewares (Plugins) -> for json incoming data
app.use(express.json()); // to get json data in post
app.use(loggerMiddleware); // log Middleware

// Router
app.use('/books', bookRouter);

app.listen(PORT, () => {
  console.log(`HTTP server is running on PORT ${PORT}`);
});
