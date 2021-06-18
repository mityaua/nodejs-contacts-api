const express = require('express')
const router = express.Router()

const {
  getContactsController,
  getContactByIdController,
  addContactsController,
  updateContactController,
  updateContactStatusController,
  deleteContactController,
} = require('../../controllers/contactsController') // Контроллеры маршрутов

const {
  addContactValidation,
  updateContactValidation,
  updateContactStatusValidation,
  idValidation
} = require('../../middlewares/validation') // Валидации Joi

const { asyncWrapper } = require('../../helpers/asyncWrapper') // Мидлвар универсального обработчика try catch

router.get('/', asyncWrapper(getContactsController)) // Роут для списка всех контактов
router.get('/:contactId', idValidation, asyncWrapper(getContactByIdController)) // Роут для контакта по id
router.post('/', addContactValidation, asyncWrapper(addContactsController)) // Роут для создания контакта
router.patch('/:contactId', idValidation, updateContactValidation, asyncWrapper(updateContactController)) // Роут для обновления контакта
router.patch('/:contactId/favorite', idValidation, updateContactStatusValidation, asyncWrapper(updateContactStatusController)) // Роут для статуса
router.delete('/:contactId', idValidation, asyncWrapper(deleteContactController)) // Роут для удаления контакта

module.exports = router
