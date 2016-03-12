'use strict'

const express = require('express')
const router = express.Router()

//controller:
const loginCtrl = require('../controllers/login.ctrl')

//user model:
const User = require('../models/user.model')

router.get('/login', loginCtrl.index)

router.post('/login', loginCtrl.login)

module.exports = router
