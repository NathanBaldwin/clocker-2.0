'use strict'

const mongoose = require('mongoose')

const visitor = require('./admin.visitor.model')
const groups = require('./admin.groups.model')
const activities = require('./admin.activity.model')

//create simple schema for Admin document. Email must be unique:
const AdminSchema = mongoose.Schema({
  orgName: String,
  ownerFirstName: String,
  ownerLastName: String,
  email: {type: String, unique: true},
  password: String,
  visitors: [visitor.schema],
  groups: [groups.schema],
  activityNames: [activities.schema]
})



module.exports = mongoose.model('adminaccounts', AdminSchema)


