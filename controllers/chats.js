const ChatModel = require('../models/chat')
const ObjectId = require('mongoose').Types.ObjectId

const getChatMessages = (req, res) => {
  const { id } = req.user
  const { chatId } = req.query
  ChatModel.findOne({
    $and: [{ chatId }, { chatId: { $regex: id } }],
  })
    .then((chat) => {
      res.json(chat.messages)
    })
    .catch((err) => res.status(400).json({ err }))
}

const getAllFirstMessages = (req, res) => {
  const { id } = req.user

  ChatModel.find({
    chatId: { $regex: id },
  })
    .then((chats) => {
      const messages = chats
        .filter((chat) => chat.messages.length > 0)
        .map((chat) => ({ message: chat.messages[chat.messages.length-1], chatId: chat.chatId }))
      return res.json(messages)
    })
    .catch((err) => res.status(400).json({ err }))
}

module.exports = { getChatMessages, getAllFirstMessages }
