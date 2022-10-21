const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const UserModel = require('../models/user')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const config = require('../config')

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await UserModel.create({ username, password })

        return done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        let user = await UserModel.findOne({ username })

        if (!user) {
          return done(null, false, { message: 'User not found' })
        }

        const validate = await user.isValidPassword(password)

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' })
        }

        return done(
          null,
          {
            id: user._id,
            username: user.username,
          },
          { message: 'Logged in Successfully' }
        )
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  new JWTstrategy(
    {
      secretOrKey: config.TOP_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('secret_token'),
    },
    async (token, done) => {
      try {
        return done(null, token.user)
      } catch (error) {
        done(error)
      }
    }
  )
)
