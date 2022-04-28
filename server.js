const express = require('express')
const methodOverride = require('method-override')
const controllers = require('./controllers')
//session
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express();
const PORT = 4000;

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


// CONTROLLERS
app.use('/home', controllers.posts)
app.use('/comments', controllers.comments)
app.use('/', controllers.auth)


app.get('/', (request, response) => response.send('Welcome to Foodapp'))





// PORT

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})