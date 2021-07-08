const fs = require('fs').promises
const path = require('path')

const { login, logout } = require('../services/authService')
const { createUser, findUserById, findUserByEmail, updateSubscription, updateAvatar, verify, reVerify } = require('../services/userService')
const { editAvatar } = require('../helpers/avatarEditor')

const AVATARS_DIR = path.join(process.cwd(), process.env.PUBLIC_DIR, process.env.USERS_AVATARS) // Директория с аватарами

// Контроллер регистрации юзера
const regController = async (req, res) => {
  const user = await findUserByEmail(req.body.email)

  if (user) {
    return res.status(409).json({ message: 'Email in use' })
  }

  const { email, subscription, avatarURL } = await createUser(req.body)
  res.status(201).json({ user: { email, subscription, avatarURL } })
}

// Контроллер верификации юзера
const verifyController = async (req, res) => {
  const result = await verify(req.params.verificationToken)

  if (result) {
    return res.status(200).json({ message: 'Verification successful' })
  }

  res.status(404).json({ message: 'User not found' })
}

// Контроллер повторной верификации юзера
const reVerifyController = async (req, res) => {
  const result = await reVerify(req.body.email)

  if (result) {
    return res.status(200).json({ message: 'Verification email sent' })
  }

  res.status(400).json({ message: 'Verification has already been passed' })
}

// Контроллер входа юзера
const loginController = async (req, res) => {
  const token = await login(req.body)

  if (token) {
    const { email, subscription, avatarURL } = await findUserByEmail(req.body.email)
    return res.status(200).json({ token, user: { email, subscription, avatarURL } })
  }

  res.status(401).json({ message: 'Email or password is wrong' })
}

// Контроллер выхода юзера
const logoutController = async (req, res) => {
  await logout(req.user.id)
  res.status(204).json()
}

// Контроллер текущего юзера
const currentUserController = async (req, res) => {
  const currentUser = await findUserById(req.user.id)

  if (currentUser) {
    const { email, subscription, avatarURL } = currentUser
    return res.status(200).json({ email, subscription, avatarURL })
  }
}

// Контроллер подписки юзера
const subscriptionController = async (req, res) => {
  const result = await updateSubscription(req.user.id, req.body.subscription)

  if (result) {
    const { email, subscription } = result
    return res.status(200).json({ user: { email, subscription }, status: 'updated' })
  }
}

// Контроллер аватара юзера
const avatarController = async (req, res) => {
  const filePath = req.file.path
  const fileName = req.file.filename

  if (req.file) {
    await editAvatar(filePath) // Обрабатывает картинку

    await fs.rename(filePath, path.join(AVATARS_DIR, fileName)) // Переносит картинку в папку с аватарами

    const newAvatarUrl = `${req.protocol}://${req.headers.host}/${process.env.USERS_AVATARS}/${fileName}` // Ссылка на новый аватар

    const url = await updateAvatar(req.user.id, newAvatarUrl)
    return res.status(200).json({ avatarURL: url })
  }

  res.status(400).json({ message: 'Please, provide valid file [jpeg, png, jpg]' })
}

module.exports = {
  regController,
  loginController,
  logoutController,
  currentUserController,
  subscriptionController,
  avatarController,
  verifyController,
  reVerifyController
}
