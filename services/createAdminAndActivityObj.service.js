'use strict'

const Admin = require('../models/admin.model')
const ActivityLog = require('../models/activityLogs.model')

const createActivityObj = function(req, res) {
  Admin.findOne({email: req.body.email}, (err, user) => {
    if(err) throw err
    if (user) {
      user.adminId = user._id
      user.save((err) => {
        if (err) throw err
      })
      //create new user's activity log document:
      ActivityLog.create({
        adminId: user._id,
        email: user.email,
        adminObj: user._id
      }, (err) => {
        if (err) throw err
        console.log("NEW ACTIVITY DOCUMENT CREATED")
        res.send(req.body)
      })
    }
  }) 
}

const createAdminObj = function(req, res) {
  // req.body.adminId = req.user
  Admin.create(req.body, (err) => {
      if (err) throw err
      console.log("NEW USER CREATED")
      //if successful, query for that user's admin doc to get their id so we
      //can create their activitly logs doc and store their id in it for reference.
      createActivityObj(req, res)
    })
}

module.exports = createAdminObj
