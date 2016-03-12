'use strict'

const authenticationService = require('../services/login.service.js')

module.exports = {
  //GET /login:
  index: (req, res) => {
    res.render('login')
  },
  
  //POST /login:
  login: (req, res) => {
    //login service will do authenticating work:
    res.send('you posted to login')
  }
}
