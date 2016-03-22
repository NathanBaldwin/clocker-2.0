'use strict'

const Admin = require('../models/admin.model')
const hashService = require('../services/hash.service')
const ActivityLog = require('../models/activityLogs.model')
const createAdminAndActivityObj = require('../services/createAdminAndActivityObj.service')
const MobileUser = require('../models/mobileUser.model')
const createMobileUser = require('../services/createMobileUser.service')


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
          //create new admin and activity document in db
          //##### CREATE NEW ADMIT ACCOUNT
        else {
          let hash = hashService(req.body.password, req, res, createAdminAndActivityObj)
        }
      })
    }
     //if provided passwords don't match, redirect to register page:
    else {
    console.log("passwords DONT match");
    res.redirect('/login');
    }
  },
  registerMobileUser: (req, res) => {
    console.log("REGISTRATION ATTEMPT INITIATED:", req.body)
    if (req.body.password === req.body.verify) {
      MobileUser.findOne({email: req.body.email}, (err, mobileUser) => {
        if (err) throw err
        //if mobileUser exists, redirect to login:
        if (mobileUser) {
          console.log('EMAIL ALREADY EXISTS')
          res.redirect('/login')
        } //##### CREATE NEW ADMIT ACCOUNT
        else {
          let hash = hashService(req.body.password, req, res, createMobileUser)
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


