'use strict'

const passport = require('passport')
const Admin = require('../models/admin.model')

module.exports = {
  getAdminObj: (req, res) => {
    console.log('RECEIVED REQUEST FOR ADMIN OBJ')
    console.log("req.user", req.user);
    // check to see if user is logged in/has active session:
    //if not, redirect to login
    if (!req.user) {
      res.send("I don't think you're logged in")
    }
    //find logged in user's admin object:
    Admin.findById(req.user, (err, adminData) => {
      if (err) throw err
      console.log("adminData returned from db:", adminData);
      res.send(adminData)
    })
  }
}


