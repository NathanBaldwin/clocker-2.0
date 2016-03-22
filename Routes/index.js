'use strict'

const express = require('express');
const router = express.Router();

// const login = require('./login')
const register = require('./register.route')
const login = require('./login.route')
const visitors = require('./visitors.route')
const groups = require('./groups.route')
const catchAll = require('./default')
const adminObj = require('./adminObj.route')
const activities = require('./activities.route')
const allUserData = require('./allUserData.route')
const activityLogs = require('./activityLogs.route')
const mobileUsers = require('./mobileUsers.route')

router.use(login)
router.use(register)
router.use(adminObj)
router.use(visitors)
router.use(groups)
router.use(activities)
router.use(allUserData)
router.use(activityLogs)
router.use(mobileUsers)


//catchall route redirects to angular app:
router.use(catchAll)

module.exports = router;
