'use strict'

const Admin = require('../models/admin.model')
const bcrypt = require('bcrypt')
const hashDifficulty = 11

//this is where the magic happens for creating a new user,
//hashing their password, and storing it in the mongo database.

//Hash password using bcrypt:
module.exports = (enteredPassword, req, res) => { //can't use fat arrows because it will change 'this'
  bcrypt.hash(enteredPassword, hashDifficulty, (err, hash) => {
    if (err) throw err
    //set hashed password as req.body.password:
    req.body.password = hash
    Admin.create(req.body, (err) => {
      if (err) throw err
      console.log("NEW USER CREATED")
      res.send(req.body)
      // res.redirect('/login')
    })  
  })
}

