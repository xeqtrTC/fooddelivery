const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'fooddelivery',
})

connection.getConnection((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('databaza je povezana')
    }
})

module.exports = connection;