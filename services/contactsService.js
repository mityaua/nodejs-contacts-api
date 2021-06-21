const Contact = require('../schemas/contacts')

// Получает все контакты
const getAllContacts = async () => {
  const contacts = await Contact.find()
  return contacts
}

// Находит контакт по id
const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId)
  return contact
}

// Создает новый контакт
const addContact = async (body, userId) => {
  const newContact = await Contact.create({ ...body, owner: userId })
  return newContact
}

// Обновляет контакт
const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true })
  return updatedContact
}

// Обновляет статус контакт (set под вопросом!)
const updateContactStatus = async (contactId, { favorite }) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
  return updatedContact
}

// Удаляет контакт (возвращает неправильный ответ)
const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndRemove(contactId)
  return contact
}

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  updateContactStatus,
  removeContact
}
