'use strict'

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const flash = require('connect-flash')
const mongoose = require('mongoose')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const passport = require('passport')

const bodyParser = require('body-parser')
const routes = require('./routes')

//envirnoment variables:
const PORT = process.env.PORT || 3000
const MONGODB_PORT = process.env.MONGODB_PORT || 27017
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'clocker2'

//MIDDLEWARE:
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')
    // Request methods to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Set to true to include cookies in the requests sen so we case you use sessions
    res.setHeader('Access-Control-Allow-Credentials', true)
    // Pass to next layer of middleware
    next()
})

app.use(bodyParser.urlencoded({
  extended:false
}))
app.use(bodyParser.json())

app.use(session({
  secret: "secret key",
  store: new RedisStore,
  resave: true,
  saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// create paths to public directory:
app.use(express.static('public'))


// ROUTES
app.use(routes)

//DATABASE AND SERVER
//connect to specified mongodb before starting server:
mongoose.connect(`mongodb://localhost:${MONGODB_PORT}/${MONGODB_DB_NAME}`)

mongoose.connection.on('open', () => {
  console.log(`Mongo db: ${MONGODB_DB_NAME} open on port ${MONGODB_PORT}`);

  server.listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}`)
  })
})

//WEBSOCKET EVENT HANDLING:
io.on('connection', (socket) => {
  console.log("socket connected!", socket.id)

  socket.on('join', (data) => {
    console.log("data.idInfo", data.adminId.toString());
    socket.join(data.adminId)
  })

  socket.on('sendEventToClocker', (data) => {
    console.log("DATA RECEIVED FROM CLIENT", data)
    console.log("SEND TO:", data.adminId)
    io.in(data.adminId).emit('remoteSignIn', {msg: "here's a message from a remote client"})
  })
})
