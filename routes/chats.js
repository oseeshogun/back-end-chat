const express = require('express')
const { getChatMessages, getAllFirstMessages } = require('../controllers/chats')
const router = express.Router()

router.get('/messages', getChatMessages)

router.get('/first', getAllFirstMessages)

module.exports = router
