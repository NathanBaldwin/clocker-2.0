'use strict'

const express = require('express')
const router = express.Router()
const mobileUsersCtrl = require('../controllers/mobileUsers.ctrl')

router.get('/mobileUsers', mobileUsersCtrl.getAllMobileUsers)
router.post('/mobileUsers/invite', mobileUsersCtrl.invite)
router.get('/singleMobileUser', mobileUsersCtrl.getSingleMobileUser)
router.post('/mobileUser/acceptInvite', mobileUsersCtrl.acceptInvite)
router.delete('/mobileUser/deleteClock', mobileUsersCtrl.deleteClock)

module.exports = router
