'use strict'
const MobileUser = require('../models/mobileUser.model')

const createMobileUser = function(req, res) {
  MobileUser.create(req.body, (err, data) => {
    if (err) throw err
    console.log("NEW MOBILE USER CREATED")
    //if successful, query for that user's admin doc to get their id so we
    //can create their activitly logs doc and store their id in it for reference.
    res.send(data)
  })
}

module.exports = createMobileUser
