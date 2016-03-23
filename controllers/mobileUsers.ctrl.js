'use strict'


const MobileUser = require('../models/mobileUser.model')

module.exports = {
  getAllMobileUsers: (req, res) => {
    MobileUser.find((err, mobileUsers) => {
      if (err) throw err
      console.log("MOBILE USERS", mobileUsers);
      res.send(mobileUsers)
    })
  }
}
