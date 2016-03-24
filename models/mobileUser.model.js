'use strict'

const mongoose = require('mongoose')



//create simple schema for Admin document. Email must be unique:
const MobileUserSchema = mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  fullName: String,
  email: {type: String, unique: true},
  password: String,
  invitations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'adminaccounts'
  }],
  clocks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'adminaccounts'
  }]
})

module.exports = mongoose.model('mobileUsers', MobileUserSchema)
