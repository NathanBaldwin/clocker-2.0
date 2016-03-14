'use strict'

const passport = require('passport')
const path = require('path')
const loginService = require('../services/login.service')

loginService //initializing login service. This is where we configure for passport's local strategy - how we are authenticating passwords

module.exports = {
  //GET /login:
  index: (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
  },
  //POST /login:
  //passport.authenticate method looks at our local strategy. Depending on result of done() in our local strategy
  //'user' argument is either true or false
  login: (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) { 
        return next(err); 
      }
      if (!user) {//if auth fails
          console.log("user:", user);
          return res.render('login', {
            message: "There was a problem with you username or password. Give it another shot."
          })
        }
      //req.logIn tells passport to log user in and passes
      //user object through serialize config (specified in login service)
      req.logIn(user, (err) => {
        if (err) { 
          return next(err); 
        }
        console.log("req.user", req.user);
        console.log("req.session.passport.user", req.session.passport.user);
        //### SERVE ANGULAR APP ######
        //create an absolute path to serve angular app
        return res.sendFile(path.join(__dirname, '../public', 'index.html'))
        // res.redirect('/users/' + user.username);
      })
    })(req, res, next)
  }
}

