const ChatModel = require('./chat')

const findOrCreateChat = async (chatId) => {
  const chat = await ChatModel.findOne({ chatId })
  return chat || (await await ChatModel.create({ chatId }))
}

module.exports = { findOrCreateChat }
