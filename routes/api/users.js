const express = require('express')
const router = express.Router()

const {
  regController,
  loginController,
  logoutController,
  currentUserController
} = require('../../controllers/usersController') // Контроллеры маршрутов

const { regValidation, loginValidation } = require('../../middlewares/userValidation') // Валидации Joi
const guard = require('../../helpers/guard') // Мидлвар на запрет\разрешение прохода

const { asyncWrapper } = require('../../helpers/asyncWrapper') // Мидлвар универсального обработчика try catch

router.post('/signup', regValidation, asyncWrapper(regController)) // Роут для регистрации юзера
router.post('/login', loginValidation, asyncWrapper(loginController)) // Роут для входа юзера
router.post('/logout', guard, asyncWrapper(logoutController)) // Роут для выхода юзера
router.get('/current', guard, asyncWrapper(currentUserController)) // Роут для текущего юзера - ДОПОЛНИТЬ!
// router.patch('/', guard, asyncWrapper(logoutController)) // Роут для обновления статуса - ДОПОЛНИТЬ! + валидация!

module.exports = router
