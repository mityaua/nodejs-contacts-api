const User = require('../schemas/user')

// Создает нового юзера в базе
const createUser = async (body) => {
  const user = await new User(body)
  return user.save()
}

// Находит юзера в базе по id
const findUserById = async (id) => {
  const user = await User.findById(id) // заменено с findOne
  return user
}

// Находит юзера в базе по email
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email })
  return user
}

// Обновляет токен юзера
const updateToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token }) // заменено с findByIdAndUpdate()
}

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateToken
}
