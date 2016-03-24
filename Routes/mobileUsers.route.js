'use strict'

const express = require('express')
const router = express.Router()
const mobileUsersCtrl = require('../controllers/mobileUsers.ctrl')

router.get('/mobileUsers', mobileUsersCtrl.getAllMobileUsers)
router.post('/mobileUsers/invite', mobileUsersCtrl.invite)
router.get('/singleMobileUser', mobileUsersCtrl.getSingleMobileUser)

module.exports = router
