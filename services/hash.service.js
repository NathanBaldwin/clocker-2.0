'use strict'

const Admin = require('../models/admin.model')
const ActivityLog = require('../models/activityLogs.model')
const bcrypt = require('bcrypt')
const hashDifficulty = 11

//this is where the magic happens for creating a new user,
//hashing their password, and storing it in the mongo database.

//Hash password using bcrypt:
module.exports = (enteredPassword, req, res) => { //can't use fat arrows because it will change 'this'
  bcrypt.hash(enteredPassword, hashDifficulty, (err, hash) => {
    if (err) throw err
    //set hashed password as req.body.password:
    req.body.password = hash
    //create new admin document:
    Admin.create(req.body, (err) => {
      if (err) throw err
      console.log("NEW USER CREATED")
      //if successful, query for that user's admin doc to get their id so we
      //can create their activitly logs doc and store their id in it for reference.
      Admin.findOne({email: req.body.email}, (err, user) => {
        if(err) throw err
        if (user) {
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
    })
  })
}
