'use strict'

const mongoose = require('mongoose')

//this is where the magic happens for creating a new user,
//hashing their password, and storing it in the mongo database.

//create simple schema for user:

const UserSchema = mongoose.Schema({
  email: {type: String, unique: true},
  password: String
})

module.exports = mongoose.model('Users', UserSchema)


