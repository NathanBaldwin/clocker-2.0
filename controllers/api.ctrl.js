'use strict'

const passport = require('passport')
const Admin = require('../models/admin.model')
const visitor = require('../models/admin.visitor.model')

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
      console.log("req.body.visitorEmail", req.body.visitorEmail);
      console.log("req.body.visitorFirstName", req.body.visitorFirstName);
      console.log("req.body.visitorLastName", req.body.visitorLastName);
      
      var newVisitor = new visitor.model({
        visitorEmail: req.body.visitorEmail,
        visitorFirstName: req.body.visitorFirstName,
        visitorLastName: req.body.visitorLastName
      })
      adminData.visitors.push(newVisitor)
      adminData.save((err) => {
        if (err) throw err
        // console.log("data:", data);
        res.send('success')
      })
    })
  }
}


