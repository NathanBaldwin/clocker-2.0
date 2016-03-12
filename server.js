'use strict'

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const routes = require('./routes')

//envirnoment variables:
const PORT = process.env.PORT || 3000
const MONGODB_PORT = process.env.MONGODB_PORT || 27017
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'clocker2'

//use jade to render templates:
app.set('view engine', 'jade');

//middleware:
app.use(bodyParser.urlencoded({
  extended:false
}))



//create paths to public directory:
app.use(express.static('public'));

//routes:
app.get('/', (req, res) => {
  res.sendfile('./public/')
})

//connect to specified mongodb before starting server:
mongoose.connect(`mongodb://localhost:${MONGODB_PORT}/${MONGODB_DB_NAME}`)

mongoose.connection.on('open', () => {
  console.log(`Mongo db: ${MONGODB_DB_NAME} open on port ${MONGODB_PORT}`);

  app.listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}`);
  });
})

