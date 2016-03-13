'use strict'

const express = require('express')
const router = express.Router()
const Admin = require('../models/admin.model')

//send rendered register jade template on get of /register route:
router.get('/register', (req, res) => {
  res.render('register')
})

//when admin submits register form, perform following logic:
router.post('/register', (req, res) => {
  //check to see if password already exists in db, so that we can
  //redirect to login page if they've already registered
  if (req.body.password === req.body.verify) {
    Admin.findOne({email: req.body.email}, (err, admin) => {
      if (err) throw err
      //if admin exists, redirect to login:
      if (admin) {
        res.redirect('/login')
      } //if they don't already exist, and the passwords are verified
        //create new admin in db:
        //password is hashed on the admin Model pre('save') method
        else {
          //if admin account doesn't already exist and passwords are verified
          //##### CREATE NEW ADMIT ACCOUNT
          Admin.create(req.body, (err) => {
            if (err) throw err
            res.redirect('/login')
          })
      }
    })
  } //if provided passwords don't match, redirect to register page:
    else {
    console.log("passwords DONT match");
    res.render('register', {
      //don't make them fill out their other info again!
      //inject following variables to register form:
      orgName: req.body.orgName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      message: 'Passwords do not match'
    });
  }
})

module.exports = router
