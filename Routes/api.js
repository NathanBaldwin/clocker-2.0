'use strict'

const express = require('express')
const router = express.Router()

router.get('/testApi', (req, res) => {
  console.log("requested data from API");
  res.send("here's your test data")
})

module.exports = router
