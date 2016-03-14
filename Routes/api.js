'use strict'

const express = require('express')
const router = express.Router()
const Admin = require('../models/admin.model')

router.get('/adminObj', (req, res) => {
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
})

module.exports = router
