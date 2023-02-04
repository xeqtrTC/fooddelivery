
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
const credentials = require('./credentials')
const app = express();

const storage = multer.diskStorage({
    destination: (req, file,cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})
app.use(express.static(__dirname + '/images'));
app.use('/image', express.static('images'))


app.post('/addfood', upload.single('image'), (req, res, next) => {

    // To access image from backend http://localhost:5005/image/aimbot.png

    const { foodname, foodprice } = req.body;
    const image = req.file.filename
    const sql = 'INSERT INTO food SET ?';
    try {
        connection.query(sql, {foodname: foodname, foodprice: foodprice, foodimage: image, fooddate: new Date()}, (err, resultOfInsert) => {
            if(resultOfInsert.affectedRows > 0) {
                return res.status(200).json({ message: 'You have added food!'})
            }  else {
                console.log(err);
            }
        })

    } catch (err) {
        return res.status(401).json({ message: 'Something went wrong!'})
    }


})

require('./Passport/passport');




app.set('view engine', 'ejs');
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
    
    
app.use('/registerUser', require('./Routes/Users'))
app.use('/food', require('./Routes/Food'))



app.listen(5005, () => {
    console.log('radi server')
})