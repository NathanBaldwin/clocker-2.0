'use strict'


const MobileUser = require('../models/mobileUser.model')
const getMobileUser = require('../services/getMobileUser.service')
const _ = require('lodash')
const mongoose = require('mongoose')

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
    console.log("REQ.USER", req.user)
    MobileUser.findById(req.body.mobileUserId)
      .populate('invitations')
      .populate('clocks')
      .exec((err, mobileUser) => {
        let pendingInvitations = mobileUser.invitations
        let clockList = mobileUser.clocks
        console.log("req.body.adminId:", req.body.adminId);
        // console.log("CLOCK LIST:", clockList);
        let idOfInvite = req.body.adminId
        let inviteExists = _.some(pendingInvitations, {_id: mongoose.Types.ObjectId(idOfInvite)})
        let clockExists = _.some(clockList, {_id: mongoose.Types.ObjectId(idOfInvite)})
        clockList.forEach((clock) => {
          console.log("clock.adminId", clock.adminId);
          console.log("clock._id", clock._id)
          console.log("idOfInvite", idOfInvite)
          console.log("equal?", clock._id == idOfInvite)
        })
        console.log("CLOCK EXISTS:", clockExists);
        if (inviteExists || clockExists) {
          console.log("ALREADY EXISTS IN INVITE OR CLOCKS COLLECTION - NOT ADDING");
          res.send('already exists')
        } else {
          "ADDING INVITATION"
          mobileUser.invitations.push(req.user)
          mobileUser.save((err) => {
            if (err) throw err
            res.send('success')
          }) 
        }    
    })
  },
  getSingleMobileUser: (req, res) => {
    console.log("TRYING TO GET SINGLE MOBILE USER", req.user)
    getMobileUser(req, res)
  },
  acceptInvite: (req, res) => {
    MobileUser.findByIdAndUpdate(req.user, 
      {
        $pull: {
          invitations: req.body.inviteId
        }
      }, (err, mobileUser) => {
        if (err) throw err
        // console.log("UPDATED DATA:", data)
        mobileUser.clocks.push(req.body.inviteId)
        mobileUser.save((err, updatedUserData) => {
          if (err) throw err
          console.log("UPDATED USER DATA", updatedUserData)
          res.send(updatedUserData)
        })
      })
  }
}
