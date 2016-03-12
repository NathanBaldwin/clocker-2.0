'use strict'

const express = require('express')
const router = express.Router()

//if there is a get request for an undefined route, redirect to login page:
router.get('*', (req, res) => {
  res.redirect('./login')
})

module.exports = router
