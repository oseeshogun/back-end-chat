const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const passport = require('passport')
const cors = require('cors')
const ChatModel = require('./models/chat')
const config = require('./config')
const routes = require('./routes/routes')
const secureRoute = require('./routes/secure_routes')
const usersRoute = require('./routes/users')
const chatsRoute = require('./routes/chats')
const { findOrCreateChat } = require('./models/utils')
const jwt = require('jsonwebtoken')
const UserModel = require('./models/user')
const ObjectId = require('mongoose').Types.ObjectId

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

app.use(express.json())
app.use(cors())

require('./controllers/auth')

app.use('/', routes)

app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute)

app.use('/users', passport.authenticate('jwt', { session: false }), usersRoute)

app.use('/chats', passport.authenticate('jwt', { session: false }), chatsRoute)

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({ error: err })
})

io.use((socket, next) => {
  const token = socket.handshake.auth.token
  const decoded = jwt.verify(token, config.TOP_SECRET)
  const { id } = decoded.user
  UserModel.findOne({ _id: { $ne: new ObjectId(id) } })
    .then((user) => next())
    .catch((err) => console.log(err))
})

io.on('connection', (socket) => {
  console.log('A user is connected')
  socket.on('text', async (data) => {
    const { receiver, sender } = data
    const chatId = [receiver.id, sender.id].sort().join('')
    const message = { ...data, chatId }
    console.log(message)
    socket.to(receiver.id).emit('new_text', message)
    const chat = await findOrCreateChat(chatId)
    chat.addMessage(message)
  })

  socket.on('join', (room) => {
    console.log('Joining ', room)
    socket.join(room)
  })
})

server.listen(config.PORT, () =>
  console.log(`Server running on port ${config.PORT}`)
)
