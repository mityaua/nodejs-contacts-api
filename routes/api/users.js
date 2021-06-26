const express = require('express')
const router = express.Router()

const {
  regController,
  loginController,
  logoutController,
  currentUserController,
  subscriptionController
} = require('../../controllers/usersController') // Контроллеры маршрутов

const { regLogValidation, subscriptionValidation } = require('../../middlewares/userValidation') // Валидации Joi
const { protect } = require('../../middlewares/protect') // Мидлвар протекции роутов
const { asyncWrapper } = require('../../helpers/asyncWrapper') // Мидлвар универсального обработчика try catch

router.post('/signup', regLogValidation, asyncWrapper(regController)) // Роут для регистрации юзера
router.post('/login', regLogValidation, asyncWrapper(loginController)) // Роут для входа юзера
router.post('/logout', protect, asyncWrapper(logoutController)) // Роут для выхода юзера
router.get('/current', protect, asyncWrapper(currentUserController)) // Роут для текущего юзера
router.patch('/subscription', protect, subscriptionValidation, asyncWrapper(subscriptionController)) // Роут для обновления статуса

module.exports = router
