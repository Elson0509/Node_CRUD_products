const mysql = require('mysql')
require('dotenv').config();

//connection to the database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//open connection
connection.connect(err=> {
    if(err) 
        console.log('[mysql error]',err)
    else
        console.log('Connected to database!');
})

module.exports = connection;