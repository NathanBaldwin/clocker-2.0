'use strict'

const passport = require('passport')
const Admin = require('../models/admin.model')
const visitor = require('../models/admin.visitor.model')

module.exports = {
  getGroups: (req, res) => {
    if (!req.user) {
      res.send('fail')
    }
    Admin.findById(req.user, (err, adminData) => {
      if (err) throw err
      res.send(adminData.visitors)
    })
  },
  addGroups: (req, res) => {

  }
  
}


