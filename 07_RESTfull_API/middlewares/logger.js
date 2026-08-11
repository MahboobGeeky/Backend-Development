// Creating Logs
// log Middleware

const fs = require('node:fs');

exports.loggerMiddleware = function(req, res, next) {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;

  try {
    fs.appendFileSync("logs.txt", log);
  } catch (err) {
    console.log("Error writing logs", err);
  }
 
  next();

};
