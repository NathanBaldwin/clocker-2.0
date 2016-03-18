'use strict'

const express = require('express')
const router = express.Router()
const activityLogCtrl = require('../controllers/activityLog.ctrl')

router.get('/allUserData', activityLogCtrl.getAllUserData)
// router.post('/activityLog', activitiesCtrl.addActivity)

module.exports = router
