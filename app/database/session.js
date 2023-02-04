const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);

const options = {
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'fooddelivery',
}

const sessionStore = new MySQLStore(options);

module.exports = sessionStore;