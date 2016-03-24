'use strict'


const MobileUser = require('../models/mobileUser.model')

module.exports = {
  getAllMobileUsers: (req, res) => {
    MobileUser.find((err, mobileUsers) => {
      if (err) throw err
      console.log("MOBILE USERS", mobileUsers);
      res.send(mobileUsers)
    })
  },
  invite: (req, res) => {
    console.log("TRYING TO INVITE MOBILE USER", req.body)
    MobileUser.findById(req.body.mobileUserId, (err, mobileUser) => {
      console.log("MOBILE USER:", mobileUser)
      console.log(mobileUser.invitations);
      mobileUser.invitations.push(req.body.adminId)
      mobileUser.save((err) => {
        if (err) throw err
      })
    })
  },
  getSingleMobileUser: (req, res) => {
    console.log("TRYING TO GET SINGLE MOBILE USER", req.user)
  }
}
