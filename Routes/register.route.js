'use strict'

const express = require('express')
const router = express.Router()
const registerCtrl = require('../controllers/register.ctrl')


router.post('/registerAdmin', registerCtrl.registerAdmin)
router.post('/registerMobileUser', registerCtrl.registerMobileUser)

module.exports = router
