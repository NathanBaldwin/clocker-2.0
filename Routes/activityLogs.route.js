'use strict'

const express = require('express')
const router = express.Router()
const activityLogCtrl = require('../controllers/activityLogs.ctrl')

router.post('/activityLogs', activityLogCtrl.addEvent)

module.exports = router
