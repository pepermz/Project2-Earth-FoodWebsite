const express = require('express')
const methodOverride = require('method-override')
// const controllers = require('./controllers')
const app = express();
const PORT = 4000;

//DB Connection
require('./config/db.connection')














app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})