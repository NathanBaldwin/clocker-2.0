'use strict'

const mongoose = require('mongoose')
const loginEvent = require('./activityLog.signInEvent')

//create simple schema for Admin document. Email must be unique:
const activityLogSchema = mongoose.Schema({
  adminId: String,
  email: String,
  activityLog: [loginEvent.schema]
})

module.exports = mongoose.model('activityLogs', activityLogSchema)


