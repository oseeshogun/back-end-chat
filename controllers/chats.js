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

module.exports = { getChatMessages }
