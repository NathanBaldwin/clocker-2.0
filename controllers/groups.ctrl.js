'use strict'

const passport = require('passport')
const Admin = require('../models/admin.model')
const visitor = require('../models/admin.visitor.model')
const group = require('../models/admin.groups.model')

module.exports = {
  getGroups: (req, res) => {
    if (!req.user) {
      res.send('fail')
    }
    Admin.findById(req.user, (err, adminData) => {
      if (err) throw err
      res.send(adminData.groups)
    })
  },
  addGroups: (req, res) => {
    Admin.findById(req.user, (err, adminData) => {
      if (err) throw err
      console.log("req.body.newGroupName", req.body.newGroupName);
      
      var newGroup = new group.model({
        groupName: req.body.newGroupName
      })
      adminData.groups.push(newGroup)
      adminData.save((err) => {
        if (err) throw err
        res.send('success')
      })
    })
  }
  
}


