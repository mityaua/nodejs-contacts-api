const User = require('../schemas/user')

// Находит юзера по id
const findUserById = async (id) => {
  const user = await User.findById(id)
  return user
}

// Находит юзера по email
const findUserByEmail = async (email) => {
  const user = await User.findById(email)
  return user
}

// Создает нового юзера
const createUser = async (body) => {
  const user = await new User(body)
  return user.save()
}

// Обновляет токен
const updateToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token }) // уточнить за метод!!! findByIdAndUpdate()
}

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateToken
}
