'use strict'

const express = require('express')
const router = express.Router()
const Admin = require('../models/admin.model')
const hashService = require('../services/hash.service')

//send rendered register jade template on get of /register route:
router.get('/register', (req, res) => {
  res.render('register')
})

//when admin submits register form, perform following logic:
router.post('/register', (req, res) => {
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
        //create new admin in db:
        //password is hashed on the admin Model pre('save') method
        //##### CREATE NEW ADMIT ACCOUNT
        else {
          hashService(req.body.password, req, res)    
        }
      })
    }
   //if provided passwords don't match, redirect to register page:
    else {
    console.log("passwords DONT match");
    res.redirect('/login');
    }
})

module.exports = router
