const Contacts = require('../schemas/contacts')

// Получает все контакты
const getAllContacts = async () => {
  const contacts = await Contacts.find()
  return contacts
}

// Находит контакт по id
const getContactById = async (contactId) => {
  const contact = await Contacts.findById(contactId)
  return contact
}

// Создает новый контакт
const addContact = async (body) => {
  const { name, email, phone } = body

  const newContact = await Contacts.create({ name, email, phone })
  return newContact
}

// Удаляет контакт (возвращает неправильный ответ)
const removeContact = async (contactId) => {
  const contact = await Contacts.findByIdAndRemove(contactId)
  return contact
}

// Обновляет контакт
const updateContact = async (contactId, body) => {
  const updatedContact = await Contacts.findByIdAndUpdate(contactId, body, { new: true })
  return updatedContact
}

// Обновляет статус контакт
const updateContactStatus = async (contactId, { favorite }) => {
  const updatedContact = await Contacts.findByIdAndUpdate(contactId, { $set: { favorite } }, { new: true })
  return updatedContact
}

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus
}
