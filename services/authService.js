const User = require('./userService')
const jwt = require('jsonwebtoken') // создает токены

const SECRET_KEY = process.env.JWT_SECRET_KEY

// Вход юзера
const login = async ({ email, password }) => {
  const user = await User.findUserByEmail(email)

  // Если юзера нет или пароль не валидный - токен не возращаем
  if (!user || (!await user.validPassword(password))) {
    return null
  }

  const id = user.id
  const payload = { id }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '8h' })

  await User.updateToken(id, token)
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
