'use strict'

// const passport = require('passport')
const Admin = require('../models/admin.model')
const activity = require('../models/admin.activity.model')

const ActivityLog = require('../models/activityLogs.model')

module.exports = {
  getAllUserData: (req, res) => {
    if (!req.user) {
      res.send('fail')
    }
    //get user's activity log data suing their uid from req.body
    ActivityLog.findOne({adminId: req.user})
      .populate('adminObj')
      .exec((err, allUserData) => {
        console.log("allUserData", allUserData)
        res.send(allUserData)
      })
  }
}
