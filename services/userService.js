const { nanoid } = require('nanoid')
const User = require('../models/user')
const { sendEmail } = require('./emailService')

// Создает нового юзера в базе
const createUser = async (body) => {
  const verifyToken = nanoid()
  const { email } = body

  await sendEmail(verifyToken, email)

  const user = await new User({ ...body, verifyToken })
  return user.save()
}

// Верифицирует юзера
const verify = async (token) => {
  const user = await User.findOne({ verifyToken: token })

  if (user) {
    await user.updateOne({ verify: true, verifyToken: null })
    return true
  }
}

// Повторно верифицирует юзера
const reVerify = async (email) => {
  const user = await User.findOne({ email, verify: false })

  if (user) {
    await sendEmail(user.verifyToken, email)
    return true
  }
}

// Обновляет токен юзера
const updateToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token })
}

// Находит юзера в базе по id
const findUserById = async (id) => {
  const user = await User.findById(id)
  return user
}

// Находит юзера в базе по email
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email })
  return user
}

// Обновляет подписку юзера
const updateSubscription = async (id, subscription) => {
  const user = await User.findOneAndUpdate({ _id: id }, { subscription }, { new: true })
  return user
}

// Обновляет аватар юзера
const updateAvatar = async (id, url) => {
  const { avatarURL } = await User.findOneAndUpdate({ _id: id }, { avatarURL: url }, { new: true })
  return avatarURL
}

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateToken,
  updateSubscription,
  updateAvatar,
  verify,
  reVerify
}
