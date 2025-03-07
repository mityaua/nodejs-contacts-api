const User = require('./userService')
const jwt = require('jsonwebtoken') // библиотека для создания токенов

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY // секрет для подписи токена

// Вход юзера
const login = async ({ email, password }) => {
  const user = await User.findUserByEmail(email)
  const isValidPassword = await user?.validPassword(password)

  // Если юзера нет или пароль не валидный или не верифицирован - возвращает null
  if (!user || !isValidPassword || !user.verify) {
    return null
  }

  // Cоздаем, подписываем и возвращаем токен с временем жизни
  const payload = { id: user.id }
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' })

  await User.updateToken(user.id, token)
  return token
}

// Выход юзера
const logout = async (id) => {
  const data = await User.updateToken(id, null)
  return data
}

module.exports = {
  login,
  logout,
}
