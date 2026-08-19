const {drizzle} = require('drizzle-orm/node-postgres');

// postgres://<username>:<password>@<host>:<port>/<db_name>
const db = drizzle("postgres://postgres:admin@localhost:5432/mydb");

module.exports = db;
