'use strict'

const express = require('express');
const router = express.Router();

const login = require('./login')
const register = require('./register')

const catchAll = require('./default')

//waterfall of routes:
router.use(login)
router.use(register)

//catchall route redirects to login page:
router.use(catchAll)

module.exports = router;
