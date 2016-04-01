'use strict'

const passport = require('passport')
const path = require('path')
const loginService = require('../services/login.service')

loginService //initializing login service. This is where we configure for passport's local strategy - how we are authenticating passwords

module.exports = {
  login: (req, res, next) => {
    console.log("GOT INTO LOGIN CONTROL FUNCTION", req.body);
    passport.authenticate('local', (err, user) => {
      if (err) { 
        return next(err); 
      }
      if (!user) {//if auth fails
          console.log("user:", user);
          return res.send('no login for you!')
        }
      //req.logIn tells passport to log user in and passes
      //user object through serialize config (specified in login service)
      req.logIn(user, (err) => {
        if (err) { 
          return next(err); 
        }
        // console.log("req.user", req.user);
        // console.log("req.session.passport.user", req.session.passport.user);
        let uid = req.session.passport.user
        return res.send(uid)
      })
    })(req, res, next)
  }
}



