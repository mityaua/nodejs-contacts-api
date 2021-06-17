const express = require('express')
const router = express.Router()

const {
  getContacts,
  getContactsById,
  addContacts,
  deleteContact,
  patchContact,
  patchContactStatus
} = require('../../controllers/contactsController') // Контроллеры маршрутов

const {
  addContactValidation,
  patchContactValidation,
  patchContactStatusValidation
} = require('../../middlewares/validation') // Валидации Joi

const { asyncWrapper } = require('../../helpers/asyncWrapper') // Мидлвар универсального обработчика try catch

router.get('/', asyncWrapper(getContacts)) // Роут для списка всех контактов
router.get('/:contactId', asyncWrapper(getContactsById)) // Роут для контакта по id
router.post('/', addContactValidation, asyncWrapper(addContacts)) // Роут для создания контакта
router.patch('/:contactId', patchContactValidation, asyncWrapper(patchContact)) // Роут для обновления контакта
router.delete('/:contactId', asyncWrapper(deleteContact)) // Роут для удаления контакта
router.patch('/:contactId/favorite', patchContactStatusValidation, asyncWrapper(patchContactStatus)) // Роут для статуса

module.exports = router
