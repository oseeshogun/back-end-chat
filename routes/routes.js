const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../config')
const { getUserByToken } = require('../controllers/user')

const router = express.Router()

const loginUser = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      if (err) {
        return next(err)
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)

        const body = { id: user.id, username: user.username }
        const token = jwt.sign({ user: body }, config.TOP_SECRET)

        return res.json({ token, user })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
}

router.post(
  '/register',
  passport.authenticate('signup', { session: false }),
  loginUser
)

router.post('/login', loginUser)

router.post('/user', getUserByToken)

module.exports = router
