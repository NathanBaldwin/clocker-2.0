'use strict'

const mongoose = require('mongoose')


//schema for visiors, saved as subdocument in admin object:
const visitorSchema = mongoose.Schema({
  visitorEmail: String,
  visitorFirstName: String,
  visitorLastName: String
})

module.exports.model = mongoose.model('visitors', visitorSchema)
module.exports.schema = visitorSchema


