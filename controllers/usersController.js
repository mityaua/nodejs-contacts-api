const { login, logout } = require('../services/authService')
const { findUserByEmail, createUser } = require('../services/userService')

// Регистрация юзера
const regController = async (req, res) => {
  const { email, password, subscription } = req.body

  const user = await findUserByEmail(email)

  if (user) {
    return res.status(409).json({ message: 'Email in use' })
  }

  const newUser = await createUser({ email, password, subscription })

  res.status(201).json({ user: { email: newUser.email, subscription: newUser.subscription, } })
}

// Вход юзера
const loginController = async (req, res) => {
  const { email, password, subscription } = req.body

  const token = await login({ email, password })

  if (token) {
    return res.status(200).json({ token, user: { email, subscription } }) // что делать с subscription? его нет в ответе
  }

  res.status(401).json({ message: 'Email or password is wrong' })
}

// Выход юзера
const logoutController = async (req, res) => {
  await logout(req.user.id)
  res.status(204).json({ message: 'No Content' })
}

// Текущий юзер - в работе!!!!
const currentUserController = async (req, res) => {
  console.log(req.user.id)

  res.status(200).json({
    email: 'example@example.com',
    subscription: 'starter'
  })
}

module.exports = {
  regController,
  loginController,
  logoutController,
  currentUserController
}
