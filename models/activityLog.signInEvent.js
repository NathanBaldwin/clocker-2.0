'use strict'

const mongoose = require('mongoose')


//schema for sign in event, saved as subdocument in activityLog object:
const signInEventSchema = mongoose.Schema({
  activity: String
})

module.exports.model = mongoose.model('signInEvents', signInEventSchema)
module.exports.schema = signInEventSchema


