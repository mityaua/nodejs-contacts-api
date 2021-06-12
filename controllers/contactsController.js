// Контроллеры - логика обработки маршрутов

// Импорт функций для работы с локальной БД (json файлом)
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../model')

// Получение всех контактов
const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts()

    res.status(200).json({ contacts, status: 'success' })
  } catch (error) {
    next(error)
  }
}

// Получение контакта по id
const getContactsById = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)

    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ contact, status: 'success' })
  } catch (error) {
    next(error)
  }
}

// Создание контакта
const addContacts = async (req, res, next) => {
  try {
    const contact = await addContact(req.body)

    res.status(201).json({ contact, status: 'success' })
  } catch (error) {
    next(error)
  }
}

// Удаление контакта
const deleteContact = async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId)

    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
}

// Обновление контакта
const patchContact = async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)

    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ contact, status: 'success' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getContacts,
  getContactsById,
  addContacts,
  deleteContact,
  patchContact,
}
