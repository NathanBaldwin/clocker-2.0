'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const hashDifficulty = 11

//this is where the magic happens for creating a new user,
//hashing their password, and storing it in the mongo database.

//create simple schema for user. Email must be unique:
const UserSchema = mongoose.Schema({
  email: {type: String, unique: true},
  password: String
})

//listen for 'save' event on this model so that, before save happens,
//we can hash their password using bcrypt:
UserSchema.pre('save', function (next) { //can't use fat arrows because it will change 'this'
  bcrypt.hash(this.password, hashDifficulty, (err, hash) => {
    if (err) throw err
    this.password = hash //change value of password property to equal hashed password
    next()
  })
})


module.exports = mongoose.model('Users', UserSchema)


