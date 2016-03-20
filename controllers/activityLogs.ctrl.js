'use strict'

// const passport = require('passport')
const Admin = require('../models/admin.model')
const activity = require('../models/admin.activity.model')

const ActivityLog = require('../models/activityLogs.model')
const Event = require('../models/activityLogs.event.model')

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
  },
  addEvent: (req, res) => {
    ActivityLog.findOne({adminId: req.user}, (err, events) => {
      if (err) throw err
      let eventObj = req.body
      console.log("EVENT OBJ", eventObj);

      let newEvent = new Event.model(eventObj)

      events.activityLog.push(newEvent)
      events.save((err) => {
        console.log("SUCCESSFULLY SAVED NEW EVENT", newEvent);
        res.send(newEvent)
      })

    })
  } 
}
