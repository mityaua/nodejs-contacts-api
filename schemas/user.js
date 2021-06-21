const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { Schema } = mongoose

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate(value) {
      const emailRegEx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      return emailRegEx.test(String(value).toLowerCase())
    }
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
})

// Хук, хеширует и солит пароль перед сохранением в базу
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(9))

  next()
})

// Сравнивает пароли при входе юзера (возвращает null если не совпадают)
userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// Валидация email в схеме
// userSchema.path('email').validate(function (value) {
//   const emailRegEx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
//   return emailRegEx.test(String(value).toLowerCase())
// })

const User = mongoose.model('user', userSchema)

module.exports = User
