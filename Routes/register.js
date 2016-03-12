'use strict'

const express = require('express')
const router = express.Router()
const User = require('../models/user.model')

//send rendered register jade template on get of /register route:
router.get('/register', (req, res) => {
  res.render('register')
})

//when user submits register form, perform following logic:
router.post('/register', (req, res) => {
  //check to see if password already exists in db, so that we can
  //redirect to login page if they've already registered
  if (req.body.password === req.body.verify) {
    User.findOne({email: req.body.email}, (err, user) => {
      if (err) throw err
      //if user exists, redirect to login:
      if (user) {
        res.redirect('/login')
      } //if they don't already exist, and the passwords are verified
        //create new user in db:
        else {
          User.create(req.body, (err) => {
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
      orgName: req.body.orgName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      message: 'Passwords do not match'
    });
  }
})

module.exports = router
