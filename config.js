require('dotenv').config()

const PORT = process.env.PORT || 3500
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const TOP_SECRET = process.env.TOP_SECRET

module.exports = { PORT, DB_PASSWORD, DB_NAME, DB_USER, TOP_SECRET }
