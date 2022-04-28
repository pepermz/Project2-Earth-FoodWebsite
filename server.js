const express = require('express')
const methodOverride = require('method-override')
const controllers = require('./controllers')
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

// CONTROLLERS
app.use('/home', controllers.posts)
app.use('/comments', controllers.comments)


app.get('/', (request, response) => response.send('Welcome to Foodapp'))

const db = require('./models')



// PORT

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})




  
