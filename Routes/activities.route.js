'use strict'

const express = require('express')
const router = express.Router()
const activitiesCtrl = require('../controllers/activities.ctrl')

router.get('/adminObj/activities', activitiesCtrl.getActivities)
router.post('/adminObj/activities', activitiesCtrl.addActivity)

module.exports = router
