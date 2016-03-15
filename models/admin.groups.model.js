'use strict'

const mongoose = require('mongoose')


//schema for visiors, saved as subdocument in admin object:
const groupSchema = mongoose.Schema({
  groupName: String
})

module.exports.model = mongoose.model('groups', groupSchema)
module.exports.schema = groupSchema


