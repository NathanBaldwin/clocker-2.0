'use strict'

const express = require('express');
const router = express.Router();

const login = require('./login')
const register = require('./register')
const api = require('./api')

const catchAll = require('./default')

//waterfall of routes:
router.use(login)
router.use(register)
router.use(api)

//catchall route redirects to angular app:
router.use(catchAll)

module.exports = router;
