const mongoose = require('../db')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
      default:
        'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre('save', async function (next) {
  const user = this
  const hash = await bcrypt.hash(this.password, 10)

  this.password = hash
  next()
})

UserSchema.methods.isValidPassword = async function (password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)

  return compare
}

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel
