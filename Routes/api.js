'use strict'

const express = require('express')
const router = express.Router()
const apiCtrl = require('../controllers/api.ctrl')

router.get('/adminObj', apiCtrl.getAdminObj)
router.post('/adminObj', (req, res) => {
  console.log("POSTED TO ADMIN OBJ!");
  console.log("req.body", req.body);
})
router.get('/adminObj/visitors', apiCtrl.getVisitors)
router.post('/adminObj/visitors', apiCtrl.addVisitor)

module.exports = router
