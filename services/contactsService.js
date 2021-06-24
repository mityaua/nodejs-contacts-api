const Contact = require('../schemas/contacts')

// Получает все контакты
const getAllContacts = async (userId) => {
  const contacts = await Contact.find({ owner: userId })
  return contacts
}

// Находит контакт по id
const getContactById = async (userId, contactId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  })
  return contact
}

// Создает новый контакт
const addContact = async (userId, body) => {
  const newContact = await Contact.create({ ...body, owner: userId })
  return newContact
}

// Обновляет контакт - обновляет чужой контакт почему-то!!!
const updateContact = async (userId, contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate({ _id: contactId, owner: userId, }, body, { new: true })
  return updatedContact
}

// Обновляет статус контакта - обновляет чужой статус почему-то!!!
const updateContactStatus = async (userId, contactId, { favorite }) => {
  const updatedContact = await Contact.findByIdAndUpdate({ _id: contactId, owner: userId, }, { favorite }, { new: true })
  return updatedContact
}

// Удаляет контакт - удаляет чужой контакт почему-то!!!
const removeContact = async (userId, contactId) => {
  const contact = await Contact.findByIdAndRemove({
    _id: contactId,
    owner: userId,
  })

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
