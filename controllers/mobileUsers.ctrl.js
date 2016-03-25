'use strict'


const MobileUser = require('../models/mobileUser.model')
const getMobileUser = require('../services/getMobileUser.service')
const _ = require('lodash')

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
    MobileUser.findById(req.body.mobileUserId)
      .populate('invitations')
      .exec((err, mobileUser) => {
        // console.log("MOBILE USER:", mobileUser)
        console.log("req.body.adminId", req.body.adminId.toString());
        // console.log("mobileUser.invitations", mobileUser.invitations);
        let pendingInvitations = mobileUser.invitations
        // console.log("pendingInvitation", pendingInvitations);
        console.log("req.body.adminId:", req.body.adminId);
        // console.log("pendingInvitations", pendingInvitations)
        let idOfInvite = req.body.adminId
        let inviteExists = _.some(pendingInvitations, {adminId: idOfInvite})
        if (inviteExists) {
          console.log("ALREADY EXISTS IN INVITE OR CLOCKS COLLECTION - NOT ADDING");
          res.send('already exists')
        } else {
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
    // MobileUser.findById(req.user, (err, mobileUser) => {
    //   if (err) throw err
      // console.log("MOBILE USER:", mobileUser)
      // console.log(mobileUser.invitations);
      // mobileUser.invitations.push(req.body.adminId)
      // mobileUser.save((err) => {
      // })

    // getMobileUser(req, res)
    
  },
  acceptInvite: (req, res) => {

    // MobileUser.findById(req.user)
    // .populate('invitations')
    // .populate('clocks')
    // .exec((err, mobileUser) => {
    //   if (err) throw err
    //   console.log("GOT MOBILE USER DATA:", mobileUser)
    //   let clockList = mobileUser.clocks
    //   console.log("req.body.inviteId", typeof req.body.inviteId);
    //   console.log("already have this one?:", _.some(clockList, {_id: req.body.inviteId}))
      

    //   res.send('success')
    // })

    // console.log("TRYING TO ACCEPT INVITE", req.user)
    // MobileUser.findOne({"_id": req.user}, (err, mobileUser) => {
    //   if (err) throw err
    //   console.log("FOUND MOBILE LOGGED IN MOBILE USER", mobileUser);
    // })
    MobileUser.findById(req.user, (err, mobileUser) => {
      if (err) throw err
      mobileUser.clocks.push(req.body.inviteId)
      mobileUser.save((err, updatedUserData) => {
        if (err) throw err
        console.log("UPDATED USER DATA", updatedUserData)
        getMobileUser(req, res)

      })
    })
  }
}
