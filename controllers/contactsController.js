// Контроллеры - логика обработки маршрутов

// Импорт функций для работы с БД
const { getAllContacts, getContactById, addContact, removeContact, updateContact, updateContactStatus } = require('../model')

// Получение всех контактов
const getContacts = async (req, res) => {
  const contacts = await getAllContacts()
  res.status(200).json({ contacts, status: 'success' })
}

// Получение контакта по id
const getContactsById = async (req, res) => {
  const contact = await getContactById(req.params.contactId)

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json({ contact, status: 'success' })
}

// Создание контакта
const addContacts = async (req, res) => {
  const contact = await addContact(req.body)
  res.status(201).json({ contact, status: 'success' })
}

// Удаление контакта
const deleteContact = async (req, res) => {
  const result = await removeContact(req.params.contactId)

  if (!result) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json({ message: 'contact deleted' })
}

// Обновление контакта
const patchContact = async (req, res) => {
  const contact = await updateContact(req.params.contactId, req.body)

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json({ contact, status: 'success' })
}

// Обновление статуса контакта
const patchContactStatus = async (req, res) => {
  const contact = await updateContactStatus(req.params.contactId, req.body)

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json({ contact, status: 'success' })
}

module.exports = {
  getContacts,
  getContactsById,
  addContacts,
  deleteContact,
  patchContact,
  patchContactStatus
}
