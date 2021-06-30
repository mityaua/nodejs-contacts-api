const fs = require('fs').promises
const path = require('path')
const Jimp = require('jimp')
const User = require('../models/user')

const AVATARS_DIR = path.join(process.cwd(), 'public', 'avatars')

// Создает нового юзера в базе
const createUser = async (body) => {
  const user = await new User(body)
  return user.save()
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

// Обновляет токен юзера
const updateToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token })
}

// Обновляет подписку юзера
const updateSubscription = async (id, subscription) => {
  const user = await User.findOneAndUpdate({ _id: id }, { subscription }, { new: true })
  return user
}

// Обрабатывает аватар юзера (кроп + ресайз + качество + созранение)
const normalizeAvatar = async (filePath) => {
  const img = await Jimp.read(filePath)
  await img.autocrop().cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE).quality(75).writeAsync(filePath)
}

// Обновляет аватар юзера - удалить старый аватар!!!
const updateAvatar = async (id, file) => {
  await normalizeAvatar(file.path)

  await fs.rename(file.path, path.join(AVATARS_DIR, file.filename)) // Перенос в папку с аватарами

  const url = path.join(AVATARS_DIR, file.filename) // Ссылка на новый аватар

  const { avatarURL } = await User.findOneAndUpdate({ _id: id }, { avatarURL: url }, { new: true }) // Обновляет аватар в базе

  return avatarURL
}

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateToken,
  updateSubscription,
  updateAvatar
}
