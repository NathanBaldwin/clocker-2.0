'use strict'

const mongoose = require('mongoose')


//schema for visiors, saved as subdocument in admin object:
const visitorSchema = mongoose.Schema({
  visitorEmail: {type: String, unique: true},
  visitorFirstName: String,
  vistorLastName: String
})

module.exports = visitorSchema


