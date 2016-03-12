'use strict'

const express = require('express');
const router = express.Router();

const login = require('./login')
const register = require('./register')

router.use(login)
router.use(register)

module.exports = router;
