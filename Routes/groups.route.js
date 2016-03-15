'use strict'

const express = require('express')
const router = express.Router()
const groupsCtrl = require('../controllers/groups.ctrl')

router.get('/adminObj/groups', groupsCtrl.getGroups)
router.post('/adminObj/groups', groupsCtrl.addGroups)

module.exports = router
