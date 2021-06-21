const User = require('../schemas/user')

// Находит юзера по id
const findUserById = async (id) => {
  const user = await User.findOne({ _id: id }) // уточнить за метод!!! findById()
  return user
}

// Находит юзера по email
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email })
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
