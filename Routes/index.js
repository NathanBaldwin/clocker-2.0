'use strict'

const express = require('express');
const router = express.Router();

// const login = require('./login')
const register = require('./register')
const login = require('./login')
const visitors = require('./visitors.route')
const groups = require('./groups.route')
const catchAll = require('./default')
const adminObj = require('./adminObj.route')
const activities = require('./activities.route')
const allUserData = require('./allUserData.route')


//waterfall of routes:
router.use(register)
router.use(login)
router.use(adminObj)
router.use(visitors)
router.use(groups)
router.use(activities)
router.use(allUserData)


//catchall route redirects to angular app:
router.use(catchAll)

module.exports = router;
