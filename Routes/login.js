'use strict'

const express = require('express')
const router = express.Router()
const passport = require('passport')

//controller:
const loginCtrl = require('../controllers/login.ctrl')




router.get('/', loginCtrl.index)

router.post('/login', loginCtrl.login)


module.exports = router
