'use strict'

const Admin = require('../models/admin.model')
const hashService = require('../services/hash.service')
const ActivityLog = require('../models/activityLogs.model')

const createActivityObj = function(req, res) {
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
}

const createAdminObj = function(req, res) {
  Admin.create(req.body, (err) => {
      if (err) throw err
      console.log("NEW USER CREATED")
      //if successful, query for that user's admin doc to get their id so we
      //can create their activitly logs doc and store their id in it for reference.
      createActivityObj(req, res)
    })
}

module.exports = {
  registerAdmin: (req, res) => {
    console.log("req.body", req.body);
    //check to see if password already exists in db, so that we can
    //redirect to login page if they've already registered
    if (req.body.password === req.body.verify) {
      Admin.findOne({email: req.body.email}, (err, admin) => {
        if (err) throw err
        //if admin exists, redirect to login:
        if (admin) {
          console.log('EMAIL ALREADY EXISTS')
          res.redirect('/login')
        } //if they don't already exist, and the passwords are verified
          //create new admin in db:
          //password is hashed on the admin Model pre('save') method
          //##### CREATE NEW ADMIT ACCOUNT
          else {
            let hash = hashService(req.body.password, req, res, createAdminObj)
            // console.log("RETURNED HASH", hash);
          }
        })
      }
     //if provided passwords don't match, redirect to register page:
      else {
      console.log("passwords DONT match");
      res.redirect('/login');
      }
    }
}


