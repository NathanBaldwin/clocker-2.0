'use strict'

const express = require('express')
const router = express.Router()
const visitorsCtrl = require('../controllers/visitors.ctrl')

router.get('/adminObj/visitors', visitorsCtrl.getVisitors)
router.post('/adminObj/visitors', visitorsCtrl.addVisitor)

module.exports = router
