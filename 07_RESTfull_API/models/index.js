// main schema (two schema files)

const booksTable = require('./book.model')
const authersTable = require('./author.model')

module.exports = {
    booksTable,
    authersTable,
}