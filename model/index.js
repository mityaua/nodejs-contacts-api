const Contacts = require('../schemas/contacts')

// Получает все контакты
const getAllContacts = async () => {
  try {
    return await Contacts.find()
  } catch (error) {
    console.error(error.message)
  }
}

// Находит контакт по id
const getContactById = async (contactId) => {
  try {
    return Contacts.findById(contactId)
  } catch (error) {
    console.error(error.message)
  }
}

// Создает новый контакт
const addContact = async (body) => {
  const { name, email, phone } = body

  try {
    return Contacts.create({ name, email, phone })
  } catch (error) {
    console.error(error.message)
  }
}

// Удаляет контакт
const removeContact = async (contactId) => {
  try {
    return await Contacts.findByIdAndDelete(contactId)
  } catch (error) {
    console.error(error.message)
  }
}

// Обновляет контакт
const updateContact = async (contactId, body) => {
  try {
    return Contacts.findByIdAndUpdate(contactId, body, { new: true })
  } catch (error) {
    console.error(error.message)
  }
}

// Обновляет статус контакт (В РАБОТЕ!!!)
// const updateContactStatus = async (contactId, body) => {
//   try {
//     return Contacts.findByIdAndUpdate(contactId, body, { new: true })
//   } catch (error) {
//     console.error(error.message)
//   }
// }

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  // updateContactStatus
}
