const { login, logout } = require('../services/authService')
const { createUser, findUserById, findUserByEmail, updateSubscription, updateAvatar } = require('../services/userService')

// Контроллер регистрации юзера
const regController = async (req, res) => {
  const user = await findUserByEmail(req.body.email)

  if (user) {
    return res.status(409).json({ message: 'Email in use' })
  }

  const { email, subscription, avatarURL } = await createUser(req.body)
  res.status(201).json({ user: { email, subscription, avatarURL } })
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
  res.status(204).json({ message: 'No Content' })
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
  if (req.file) {
    const url = await updateAvatar(req.user.id, req.file)
    return res.status(200).json({ avatarURL: url })
  }

  res.status(400).json({ message: 'Please, provide a valid file' })
}

module.exports = {
  regController,
  loginController,
  logoutController,
  currentUserController,
  subscriptionController,
  avatarController
}
