'use strict'

const mongoose = require('mongoose')


//schema for sign in event, saved as subdocument in activityLog object:
const eventSchema = mongoose.Schema({
  activity: String
})

module.exports.model = mongoose.model('events', eventSchema)
module.exports.schema = eventSchema


