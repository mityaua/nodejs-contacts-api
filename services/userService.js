const fs = require('fs').promises
const path = require('path')
const jimp = require('jimp')
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

// Обновляет аватар юзера - нужно получить ссылку на новый аватар + обновить у юзера в базе + удалить старый аватар!!! findOne, findOneAndUpdate
const updateAvatar = async (id, file) => {
  const img = await jimp.read(file.path)
  await img.autocrop().cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(file.path)
  await fs.rename(file.path, path.join(AVATARS_DIR, file.originalname)) // Сделать уникальным для юзера

  const avatar = 'тут будет ссылка на изображение'
  return avatar
}

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateToken,
  updateSubscription,
  updateAvatar
}
