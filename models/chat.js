const ObjectId = require('mongoose').Types.ObjectId
const mongoose = require('../db')

const Schema = mongoose.Schema

const MessageSchema = new Schema(
  {
    localId: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    sender: {
      type: ObjectId,
      ref: 'user',
    },
    receiver: {
      type: ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
)

const ChatSchema = new Schema(
  {
    chatId: {
      type: String,
      required: true,
      unique: true,
    },
    messages: {
      type: [MessageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

ChatSchema.methods.addMessage = async function (message) {
  const chat = this
  chat.messages.push({
    localId: message.id,
    text: message.text,
    image: message.image,
    sender: new ObjectId(message.sender.id),
    receiver: new ObjectId(message.receiver.id),
  })
  chat.save()
}

const ChatModel = mongoose.model('chat', ChatSchema)

module.exports = ChatModel
