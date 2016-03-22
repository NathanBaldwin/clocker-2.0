'use strict'

const express = require('express')
const router = express.Router()
const passport = require('passport')
const loginCtrl = require('../controllers/login.ctrl')

router.post('/login', loginCtrl.login)
router.post('/loginMobileUser', loginCtrl.login)


module.exports = router
