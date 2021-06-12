const express = require('express')
const router = express.Router()

const {
  getContacts,
  getContactsById,
  addContacts,
  deleteContact,
  patchContact,
} = require('../../controllers/contactsController') // Импорт контроллеров маршрутов

const {
  addContactValidation,
  patchContactValidation
} = require('../../middlewares/validation') // Импорт валидации

router.get('/', getContacts) // Роут для списка всех контактов
router.get('/:contactId', getContactsById) // Роут для контакта по id
router.post('/', addContactValidation, addContacts) // Роут для создания контакта
router.patch('/:contactId', patchContactValidation, patchContact) // Роут для обновления контакта
router.delete('/:contactId', deleteContact) // Роут для удаления контакта

module.exports = router
