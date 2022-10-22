const express = require('express')
const { getChatMessages } = require('../controllers/chats')
const router = express.Router()

router.get('/messages', getChatMessages)

module.exports = router
