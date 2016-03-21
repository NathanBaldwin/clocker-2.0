'use strict'

const mongoose = require('mongoose')
const event = require('./activityLogs.event.model')
// const AdminAccounts = require('./admin.model.js')

//create simple schema for Admin document. Email must be unique:
const activityLogSchema = mongoose.Schema({
  adminId: String,
  email: String,
  activityLog: [event.schema],
  adminObj: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'adminaccounts'
  }
})

module.exports = mongoose.model('activityLogs', activityLogSchema)
