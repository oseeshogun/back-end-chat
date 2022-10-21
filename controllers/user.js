const UserModal = require('../models/user')
const ObjectId = require('mongoose').Types.ObjectId

const getUserByToken = (req, res) => {
  return res.json(req.user)
}

const getAllUsers = (req, res) => {
  const { id } = req.user
  UserModal.find({ _id: { $ne: new ObjectId(id) } })
    .then((users) => {
      res.json(users.map((user) => ({ username: user.username, id: user._id })))
    })
    .catch((error) => res.status(400).json({ error }))
}

module.exports = { getUserByToken, getAllUsers }
