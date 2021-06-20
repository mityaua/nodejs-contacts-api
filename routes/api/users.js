const express = require('express')
const router = express.Router()

const {
  regController,
  loginController,
  logoutController
} = require('../../controllers/usersController') // Контроллеры маршрутов

// const { } = require('../../middlewares/validation') // Валидации Joi

const { asyncWrapper } = require('../../helpers/asyncWrapper') // Мидлвар универсального обработчика try catch

router.post('/signup', asyncWrapper(regController)) // Роут для регистрации юзера
router.post('/login', asyncWrapper(loginController)) // Роут для входа юзера
router.post('/logout', asyncWrapper(logoutController)) // Роут для выхода юзера

module.exports = router
