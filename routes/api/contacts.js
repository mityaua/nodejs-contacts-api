const express = require('express')
const router = express.Router()

const {
  getContactsController,
  getContactByIdController,
  addContactController,
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
const guard = require('../../helpers/guard') // Мидлвар защиты данных

router.get('/', guard, asyncWrapper(getContactsController)) // Роут для списка всех контактов
router.get('/:contactId', [guard, idValidation], asyncWrapper(getContactByIdController)) // Роут для контакта по id
router.post('/', [guard, addContactValidation], asyncWrapper(addContactController)) // Роут для создания контакта
router.patch('/:contactId', [guard, idValidation, updateContactValidation], asyncWrapper(updateContactController)) // Роут для обновления контакта
router.patch('/:contactId/favorite', [guard, idValidation, updateContactStatusValidation], asyncWrapper(updateContactStatusController)) // Роут для статуса
router.delete('/:contactId', [guard, idValidation], asyncWrapper(deleteContactController)) // Роут для удаления контакта

module.exports = router
