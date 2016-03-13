'use strict'
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/admin.model')
const authenticate = require('./authenticate.service')

console.log("authentication service initialized")

passport.serializeUser(function(user, done) {//parses user object that gets sent with request
  done(null, user._id);//defines what info we want stored in session, retrievable via req.session.passport.user
  //we'll store this session data in redis
  //this session will have an id, which is stored in an encrypted cookie on the browser
  //that cookie gets passed back to expres in the header on each request
});

passport.deserializeUser(function(id, done) {//first parameter is req.session.passport.user (which we spedified above to just be our userid)
  Admin.findById(id, done);//specifies what we want req.user to be
});

passport.use(new LocalStrategy({
    usernameField: 'email' //need to set options because it's expecting a username
  },
  (email, password, done ) => {
    console.log("before user.findOne");
    Admin.findOne({email: email}, (err, user) => {
      if(err) throw err
      if (user) {
        //use authenticate service to have bcrypt compare provided and stored passwords:
                //provide pw    stored pw
        authenticate(password, user.password, (err, result) => { //callback function we're passing to authenticate service
          if (err) throw err
          if (result) {//(if result of hashing === true (valid))
            console.log("SUCCESS. USER:", user);
            return done(null, user) //tells passport we are logged in, and attaches user object to request
          } //(if result of hashing === false)...
            else {
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
  }));
