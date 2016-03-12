'use strict'

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Here is your login page')
})

module.exports = router
