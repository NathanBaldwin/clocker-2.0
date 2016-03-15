'use strict'

const express = require('express')
const router = express.Router()
const adminObjCtrl = require('../controllers/adminObj.ctrl')

router.get('/adminObj', adminObjCtrl.getAdminObj)
router.post('/adminObj', (req, res) => {
  console.log("POSTED TO ADMIN OBJ!")
  console.log("req.body", req.body)
})

module.exports = router
