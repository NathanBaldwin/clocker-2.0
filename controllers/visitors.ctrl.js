'use strict'

const passport = require('passport')
const Admin = require('../models/admin.model')
const Visitor = require('../models/admin.visitor.model')

module.exports = {

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
      
      var newVisitor = new Visitor.model({
        visitorEmail: req.body.visitorEmail,
        visitorFirstName: req.body.visitorFirstName,
        visitorLastName: req.body.visitorLastName
      })
      adminData.visitors.push(newVisitor)
      adminData.save((err) => {
        if (err) throw err
        res.send('success')
      })
    })
  }
}


