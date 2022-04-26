const mongoose = require('mongoose');

//Access to .env
require('dotenv').config()

const connectionStr = process.env.MONGODB_URI;

mongoose.connect(connectionStr);

//Mongo Connection SUCCESS
mongoose.connection.on('connected', () => {
    console.log(`[${new Date().toLocaleTimeString()}]- MongoDB connected!!`)
})

//Mongo Connection ERROR
mongoose.connection.on('error', (error) => {
    console.log(`MongoDB connection error`, error)
})

//Mongo Connection DISCONNECTED
mongoose.connection.on('disconnected', () => {
    console.log(`MongoDB Disconnected!`)
})