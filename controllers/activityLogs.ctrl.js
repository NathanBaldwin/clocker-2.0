'use strict'

// const passport = require('passport')
const Admin = require('../models/admin.model')
const activity = require('../models/admin.activity.model')

const ActivityLog = require('../models/activityLogs.model')
const Event = require('../models/activityLogs.event.model')
const _ = require('lodash')

module.exports = {
  getAllUserData: (req, res) => {
    if (!req.user) {
      res.send('fail')
    }
    //get user's activity log data suing their uid from req.body
    console.log("TRYING TO GET ALL USER DATA", req.user);
    ActivityLog.findOne({adminId: req.user})
      .populate('adminObj')
      .exec((err, allUserData) => {
        if (err) throw err
        // console.log("ALL USER DATA", allUserData);
        res.send(allUserData)
      })
  },
  addEvent: (req, res) => {
    ActivityLog.findOne({adminId: req.user}, (err, events) => {
      if (err) throw err
      let eventObj = req.body
      console.log("EVENT OBJ", eventObj);

      let newEvent = new Event.model(eventObj)
      console.log("NEW EVENT ID", newEvent._id)
      newEvent.eventId = newEvent._id
      events.activityLog.push(newEvent)
      events.save((err) => {
        console.log("SUCCESSFULLY SAVED NEW EVENT", newEvent);
        res.send(newEvent)
      })
    })
  },

  updateEvent: (req, res) => {
    let targetEventId = req.body._id

    ActivityLog.findOneAndUpdate({"adminId": req.user, "activityLog.eventId": targetEventId},
      {"$set": {"activityLog.$": req.body}}, (err, data) => {
        if (err) throw err
        res.send('success')
        // console.log("DATA RETURNED", data);
      })
  }
}


