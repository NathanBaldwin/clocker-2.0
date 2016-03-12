'use strict'

const express = require('express')
const router = express.Router()

router.get('/register', (req, res) => {
  res.send('Here is your registration page')
})

module.exports = router
