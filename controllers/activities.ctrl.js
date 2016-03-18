'use strict'

// const passport = require('passport')
const Admin = require('../models/admin.model')
const activity = require('../models/admin.activity.model')

module.exports = {
  getActivities: (req, res) => {
    if (!req.user) {
      res.send('fail')
    }
    Admin.findById(req.user, (err, adminData) => {
      if (err) throw err
      res.send(adminData.activities)
    })
  },
  addActivity: (req, res) => {
    Admin.findById(req.user, (err, adminData) => {
      if (err) throw err
      console.log("req.body.activityName", req.body.activityName);
      
      var newActivity = new activity.model({
        activityName: req.body.activityName
      })
      adminData.activityNames.push(newActivity)
      adminData.save((err) => {
        if (err) throw err
        res.send('success')
      })
    })
  }
  
}
