'use strict'

const mongoose = require('mongoose')


//schema for sign in event, saved as subdocument in activityLog object:
const eventSchema = mongoose.Schema({
  activity: String,
  firstName: String,
  lastName: String,
  email: String,
  group: String,
  activity: String,
  inFormatted: String,
  day: String,
  in: Date,
  signedIn: Boolean
})

module.exports.model = mongoose.model('events', eventSchema)
module.exports.schema = eventSchema


