const express = require('express')
const methodOverride = require('method-override')
const controllers = require('./controllers')
//session
const session = require('express-session')
const MongoStore = require('connect-mongo')
const navLinks = require('./navLinks')
const app = express();
const PORT = 4000;
const axios = require("axios");

//DB Connection
require('./config/db.connection')

//app configs
app.set('view engine', 'ejs')

// MIDDLEWARE
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false}))

//session
app.use(
    session ({
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI}),
        secret: process.env.MYSECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
        },
    })
)

app.use(navLinks)

app.use(function (req, res, next) {
    res.locals.user = req.session.currentUser;
    console.log(res.locals);
    console.log(`Current user is ${res.locals.user}`)
    next();
});

// CONTROLLERS
app.use('/home', controllers.posts)
app.use('/comments', controllers.comments)
app.use('/', controllers.auth)


app.get('/', (req, res) => {
    res.render('homepage.ejs')
})

const db = require('./models')



// PORT

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${PORT}`)
})




  
