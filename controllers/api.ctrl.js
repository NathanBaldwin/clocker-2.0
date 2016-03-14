'use strict'

const passport = require('passport')
const Admin = require('../models/admin.model.js')
const Visitor = require('../models/admin.visitor.model.js')

module.exports = {
  getAdminObj: (req, res) => {
    console.log("requested data from API");
    console.log("req.user", req.user);
    // check to see if user is logged in/has active session:
    //if not, redirect to login
    if (!req.user) {
      res.redirect('/login')
    }
    //find logged in user's admin object:
    Admin.findById(req.user, (err, adminData) => {
      if (err) throw err
      console.log("adminData returned from db:", adminData);
      res.send(adminData)
    })
  },

  getVisitors: (req, res) => {
    if (!req.user) {
      res.redirect('/login')
    }
    Admin.findById(req.user, (err, adminData) => {
      if (err) throw err
      res.send(adminData.visitors)
    })
  },

  addVisitor: (req, res) => {
    if (!req.user) {
      res.redirect('/login')
    }
    console.log("you poasted to adminObj/visitors");
    console.log("req.body", req.body);
    Admin.findById(req.user, (err, adminData) => {
      if (err) throw err
      adminData.visitors.addToSet(req.body)
      adminData.save()
      // res.send(adminData.visitors)
    })
  }
}


