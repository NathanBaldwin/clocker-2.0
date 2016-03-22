'use strict'

const Admin = require('../models/admin.model')
const ActivityLog = require('../models/activityLogs.model')
const bcrypt = require('bcrypt')
const hashDifficulty = 11

//this is where the magic happens for creating a new user,
//hashing their password, and storing it in the mongo database.

//Hash password using bcrypt:
module.exports = (enteredPassword, req, res, cb) => { //can't use fat arrows because it will change 'this'
  bcrypt.hash(enteredPassword, hashDifficulty, (err, hash) => {
    if (err) throw err
    //set hashed password as req.body.password:
    req.body.password = hash
    console.log("hash", hash);
    cb(req, res)

    // create new admin document:

  })
}
