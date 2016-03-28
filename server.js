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

//ENVIRONMENT variables:
const PORT = process.env.PORT || 3000
const MONGODB_PORT = process.env.MONGODB_PORT || 27017
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'clocker2_1'

//MIDDLEWARE:
app.use(function (req, res, next) {
  // IP's we want to allow access:
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080')
  // Request methods to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // Request headers to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  // Include cookies in the requests sent
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
  resave: false,
  saveUninitialized: true
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
    console.log("DATA:", data);
    console.log("type of id:", typeof data.adminId);
    console.log("data.idInfo", data.adminId.toString());

    var room = data.adminId
    socket.join(room, ()=> {
      console.log(`${data.orgName} JOINED ROOM ${room}`);
    })
  })

  socket.on('createClockerEvent', (eventData) => {
    console.log("eventData RECEIVED FROM CLIENT", eventData)
    console.log("SEND TO:", eventData.adminId)
    console.log("type of id:", typeof eventData.adminId);
    var room = eventData.adminId
    socket.broadcast.to(room).emit('createClockerEvent', eventData)
  })
})
