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
    ActivityLog.findOne({adminId: req.user}, (err, userData) => {
      if (err) throw err
      res.send('got all your activities here:', userData)
    })
  }
}
