'use strict'

const express = require('express')
const flash = require('connect-flash')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
// const flash = require('connect-flash')

const bodyParser = require('body-parser')
const routes = require('./routes')

//envirnoment variables:
const PORT = process.env.PORT || 3000
const MONGODB_PORT = process.env.MONGODB_PORT || 27017
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'clocker2'

//use jade to render templates:
app.set('view engine', 'jade');

//MIDDLEWARE:


app.use(session({
  secret: "secret key",
  resave: true,
  saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({
  extended:false
}))

app.use(bodyParser.json())

// create paths to public directory:
app.use(express.static('public'));

//ROUTES
app.use(routes)

//DATABASE AND SERVER
//connect to specified mongodb before starting server:
mongoose.connect(`mongodb://localhost:${MONGODB_PORT}/${MONGODB_DB_NAME}`)

mongoose.connection.on('open', () => {
  console.log(`Mongo db: ${MONGODB_DB_NAME} open on port ${MONGODB_PORT}`);

  app.listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}`);
  });
})

