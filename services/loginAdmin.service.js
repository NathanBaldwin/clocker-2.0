'use strict'

const Admin = require('../models/admin.model')
const authenticate = require('./authenticate.service')

const loginAdmin = function(email, password, done) {
  Admin.findOne({email: email}, (err, user) => {
    if(err) throw err
    if (user) {
      //use authenticate service to have bcrypt compare provided and stored passwords:
      console.log("provided password:", password)
      console.log("stored password", user.password);
              //provided pw    stored pw
      authenticate(password, user.password, (err, result) => { //callback function we're passing to authenticate service
        if (err) throw err
        if (result) {//(if result of hashing === true (valid))
          console.log("AUTH SUCCESS.");
          return done(null, user) //tells passport we are logged in, and attaches user object to request
        } //(if result of hashing === false)...
          else {
          console.log("AUTHENTICATION FAILED");
          return done(null, false)//tells passport authentication failed
        }
      })
    } else {
      console.log("DON'T HAVE THAT EMAIL IN OUR DATABASE");
      //first argument of 'done' is error
      //second argument is either false if it's failed, or the user object;
      //takes user object (second arg and makes it available as part of request req.user)
      return done(null, null) 
    }
  })
}

module.exports = loginAdmin
