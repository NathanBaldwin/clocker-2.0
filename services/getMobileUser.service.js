'use strict'
const MobileUser = require('../models/mobileUser.model')

const getSingleMobileUser = (req, res) => {
    console.log("TRYING TO GET SINGLE MOBILE USER", req.user)
    MobileUser.findById(req.user)
      .populate('invitations')
      .populate('clocks')
      .exec((err, userData) => {
        if (err) throw err
        console.log("GOT MOBILE USER DATA:", userData)
        res.send(userData)
      })
  }

module.exports = getSingleMobileUser
