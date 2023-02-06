
require("dotenv").config();

const express = require('express');
const connection = require('./database/database');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const sessionStore = require('./database/session');
const session = require('express-session')
const cors = require('cors')
const multer = require('multer');
const upload = require('./multer/multer');
const credentials = require('./credentials')
const app = express();

app.use(express.static(__dirname + '/images'));
app.use('/image', express.static('images'))




require('./Passport/passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json()); 
app.use(credentials);


app.use(
    cors({
        origin: '*', 
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
        credentials: true
    })
    )
    
const sessionMiddleware = session({
        secret: 'food',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        cookie: { maxAge: 3600000000 }
})
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session())
app.use(cookieParser());

app.get('/', (req, res) => {
    connection.query('SELECT * FROM food', (err, result) => {
        if(result) {
            console.log(result);
        } else {
            console.log(err);
        }
    })
})
    
app.use('/users', require('./Routes/Users'))
app.use('/food', require('./Routes/Food'))

app.listen(5005, () => {
    console.log('radi server')
})