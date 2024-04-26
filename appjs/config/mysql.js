// Import mysql
const mysql = require('mysql');

// Membuat connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_lobster'
});


//eksport untuk digunakan difile lain
module.exports = connection;