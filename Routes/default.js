'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')


// if there is a get request for an undefined route, redirect to login page:
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

module.exports = router
