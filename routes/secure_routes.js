const express = require('express')
const { getUserByToken } = require('../controllers/user')
const router = express.Router()

router.get('/', getUserByToken)

module.exports = router
