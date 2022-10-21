const express = require('express')
const passport = require('passport')
const cors = require('cors')
const config = require('./config')
const routes = require('./routes/routes')
const secureRoute = require('./routes/secure_routes') 
const usersRoute = require('./routes/users')

const app = express()

app.use(express.json())
app.use(cors())

require('./controllers/auth')

app.use('/', routes)

app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute)

app.use('/users', passport.authenticate('jwt', { session: false }), usersRoute)

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({ error: err })
})

app.listen(config.PORT, () =>
  console.log(`Server running on port ${config.PORT}`)
)
