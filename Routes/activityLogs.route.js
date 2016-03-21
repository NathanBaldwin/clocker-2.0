'use strict'

const express = require('express')
const router = express.Router()
const activityLogCtrl = require('../controllers/activityLogs.ctrl')

router.post('/activityLogs', activityLogCtrl.addEvent)
router.put('/activityLogs', activityLogCtrl.updateEvent)

module.exports = router
