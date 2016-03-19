'use strict'

const mongoose = require('mongoose')
const loginEvent = require('./activityLog.signInEvent')
// const AdminAccounts = require('./admin.model.js')

//create simple schema for Admin document. Email must be unique:
const activityLogSchema = mongoose.Schema({
  adminId: String,
  email: String,
  activityLog: [loginEvent.schema],
  adminObj: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'adminaccounts'
  }
})

module.exports = mongoose.model('activityLogs', activityLogSchema)
