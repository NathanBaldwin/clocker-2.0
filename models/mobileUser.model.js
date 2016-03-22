'use strict'

const mongoose = require('mongoose')


//create simple schema for Admin document. Email must be unique:
const MobileUserSchema = mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  password: String
})

module.exports = mongoose.model('mobileUsers', MobileUserSchema)
