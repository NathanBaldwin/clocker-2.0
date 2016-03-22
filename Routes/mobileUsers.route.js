'use strict'

const express = require('express')
const router = express.Router()
const mobileUsersCtrl = require('../controllers/mobileUsers.ctrl')

router.get('/mobileUsers', mobileUsersCtrl.getAllMobileUsers)

module.exports = router
