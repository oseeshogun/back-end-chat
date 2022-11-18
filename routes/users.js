const express = require('express')
const { getAllUsers, changeProfil } = require('../controllers/user')
const { body } = require('express-validator')
const router = express.Router()

router.get('/', getAllUsers)

router.put('/avatar', body('url').isURL().exists(), changeProfil)

module.exports = router
