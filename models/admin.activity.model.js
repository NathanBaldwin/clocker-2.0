'use strict'

const mongoose = require('mongoose')


//schema for visiors, saved as subdocument in admin object:
const activitySchema = mongoose.Schema({
  activityName: String
})

module.exports.model = mongoose.model('activities', activitySchema)
module.exports.schema = activitySchema


