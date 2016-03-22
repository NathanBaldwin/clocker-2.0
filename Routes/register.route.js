'use strict'

const express = require('express')
const router = express.Router()
const registerCtrl = require('../controllers/register.ctrl')


router.post('/registerAdmin', registerCtrl.registerAdmin)

module.exports = router
